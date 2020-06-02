import React, {useState, useEffect, useRef, RefObject} from 'react';
import {ScrollView} from "../../../components";
import {Transition} from "react-transition-group";
import {connect} from "react-redux";
import ObjectDetection from "../../../api/methods/validator";
import service from "../../../api/service";
import {wxConfig} from "../../../api/methods/common";

/*
* 将需要的state的节点注入到与此视图数据相关的组件上
* state：redux 数据
* props：外部组件或者父组件传递过来的数据
 */
const mapStateToProps = (state:any,props:any) => {
    return {
        userInfo: state.User.userInfo||{userId: '',userNam:''}
    }
}

// 将需要绑定的响应事件注入到组件上
const mapDispatchToProps = (dispatch:any) => {
    return {
        getUserInfo: (payload:{userId:string,userNam:string}) => dispatch({type: 'getUserInfo', payload: {userInfo:payload}})
    }
}

function WxVideoPlay () {
    const videoElem: RefObject<any> = useRef();
    const [userId] = useState(ObjectDetection.GetUrlParam('userId'));
    const [openId] = useState(ObjectDetection.GetUrlParam('openId'));
    const [videoId] = useState(ObjectDetection.GetUrlParam('videoId'));
    const [videoInfo,setVideoInfo] = useState({backVideoUrl: ''});
    const [advLoopIndex,setLoopIndex] = useState(0);
    let [advInterval,setAdvInterval] = useState(0);
    const queryVideoPlay = async () => {
        try {
            const wxOptions = await service.getWxConfig({url: window.location.href.split('#')[0]});
            const result = await service.queryVideoPlay({liveId: Number(videoId)});
            if (ObjectDetection.isObject(result)) {
                setVideoInfo({...result});
            }
            await wxConfig({
                appId: wxOptions.appid,
                nonceStr: wxOptions.nonceStr,
                signature: wxOptions.signature,
                timestamp: Number(wxOptions.timestamp)
            }).then((wx) => {
                videoElem.current.play();
            })
        }catch (e) {

        }
    }
    const queryVideoAdv = async () => {
        const result = await service.queryVideoAdv({liveId: Number(videoId)});
        let Index = 0;
        clearInterval(advInterval);
        if (ObjectDetection.isArray(result) && result.length > 0) {
            advInterval = window.setInterval(() => {
                Index++;
                setLoopIndex(Index%result.length);
            },1000);
            setAdvInterval(advInterval);
        }
    }
    useEffect(() => {
        queryVideoPlay();
        queryVideoAdv();
        return () => {
            clearInterval(advInterval);
            setAdvInterval(advInterval);
        }
    },[])
    return (<div className={'container hidden'}>
        <ScrollView scrollY>
            <div className={'main relative'}>
                <video ref={videoElem} src={videoInfo.backVideoUrl}
                       className={'container object-fit-cover'} controls={true} autoPlay={true}
                       x-webkit-airplay={`true`} x5-video-player-type={'h5'}
                       x5-playsinline={`true`} webkit-playsinline={`true`} playsInline={true}></video>
                <div className={'absolute absolute-b absolute-l absolute-r padding-sm text-xl text-white'}></div>
            </div>
        </ScrollView>
    </div>)
}

export default connect(mapStateToProps,mapDispatchToProps,)(WxVideoPlay);

import React, {useState, useEffect, useRef, RefObject} from 'react';
import {ScrollView} from "../../../components";
import AdvLoop from "./advLoop";
import {connect} from "react-redux";
import ObjectDetection from "../../../api/methods/validator";
import service from "../../../api/service";
import {wxConfig} from "../../../api/methods/common";
import DPlayer from "dplayer";
import {mapDispatchToProps,mapStateToProps} from "../../../redux/mapProps";

function WxVideoPlay (props: any) {
    const videoElem: RefObject<any> = useRef();
    const [userId] = useState(ObjectDetection.GetUrlParam('userId'));
    const [videoId] = useState(ObjectDetection.GetUrlParam('videoId'));
    const [userInfo,setUserInfo] = useState(props.userInfo);
    const [videoInfo,setVideoInfo] = useState({backVideoUrl: ''});

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
                newDPlayer(result.backVideoUrl);
            })
        }catch (e) {}
    }
    const newDPlayer = (url: string) => {
        const dp = new DPlayer({
            container: videoElem.current,
            autoplay: true,
            video: {
                url: url,
                type: 'auto'
            }
        });
        dp.play();
    }

    useEffect(() => {
        service.getUserInfo({userId}).then(response => {
            const {userInfo} = response;
            const {payload} = props.getUserInfo(userInfo);
            setUserInfo(payload.userInfo);
        });
        queryVideoPlay();
        return () => {}
    },[]);

    return (<div className={'container hidden'}>
        <ScrollView scrollY>
            <div className={'main relative'}>
                <div ref={videoElem} className={'container'}></div>
                {ObjectDetection.isPlainObject(userInfo)? <AdvLoop /> : ''}
            </div>
        </ScrollView>
    </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(WxVideoPlay);

import React, {useState, useEffect, useRef, RefObject} from 'react';
import {ScrollView} from "../../../components";
import {NavLink} from "react-router-dom";
import {Transition} from "react-transition-group";
import {connect} from "react-redux";
import ObjectDetection from "../../../api/methods/validator";
import service from "../../../api/service";
import {wxConfig} from "../../../api/methods/common";
import DPlayer from "dplayer";

/*
* 将需要的state的节点注入到与此视图数据相关的组件上
* state：redux 数据
* props：外部组件或者父组件传递过来的数据
 */
const mapStateToProps = (state:any,props:any) => {
    return {
        userInfo: state.User.userInfo||JSON.parse(sessionStorage.getItem('userInfo') as string)
    }
}

// 将需要绑定的响应事件注入到组件上
const mapDispatchToProps = (dispatch:any) => {
    return {
        getUserInfo: (payload:{userId:string,userNam:string}) => dispatch({type: 'getUserInfo', payload: {userInfo:payload}})
    }
}

function WxVideoPlay (props: any) {
    const videoElem: RefObject<any> = useRef();
    const [userId] = useState(ObjectDetection.GetUrlParam('userId'));
    const [openId] = useState(ObjectDetection.GetUrlParam('openId'));
    const [videoId] = useState(ObjectDetection.GetUrlParam('videoId'));
    const [userInfo,setUserInfo] = useState(props.userInfo);
    const [videoInfo,setVideoInfo] = useState({backVideoUrl: ''});
    const [advLoopIndex,setLoopIndex] = useState(0);
    const [advArray,setAdvArray] = useState([]);
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
                newDPlayer(result.backVideoUrl);
            })
        }catch (e) {
            console.log(e,'============================');
        }
    }
    const queryVideoAdv = async () => {
        const result = await service.queryVideoAdv({liveId: Number(videoId)});
        let Index = 0;
        clearInterval(advInterval);
        if (ObjectDetection.isArray(result) && result.length > 0) {
            setAdvArray(result);
            advInterval = window.setInterval(() => {
                Index++;
                setLoopIndex(Index%result.length);
            },60000);
            setAdvInterval(advInterval);
        }
    }
    const navigator = (url: string) => window.open(url,'_self');
    const newDPlayer = (url: string) => {
        const dp = new DPlayer({
            container: videoElem.current,
            autoplay: true,
            video: {
                url: url,
                type: 'auto'
            },
            subtitle: {
                url: '',
                fontSize: `${20/46.875}rem`,
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
        queryVideoAdv();
        return () => {
            clearInterval(advInterval);
            setAdvInterval(advInterval);
        }
    },[]);

    return (<div className={'container hidden'}>
        <ScrollView scrollY>
            <div className={'main relative'}>
                <div ref={videoElem} className={'container'}></div>
                {/*<video ref={videoElem} src={videoInfo.backVideoUrl}
                       className={'container object-fit-cover'} controls={true} autoPlay={true}
                       x-webkit-airplay={`true`} x5-video-player-type={'h5'}
                       x5-playsinline={`true`} webkit-playsinline={`true`} playsInline={true}></video>*/}

                <div className={'absolute absolute-l absolute-r padding-xs text-xl text-white margin-left-sm'}
                     style={{bottom: `${94/46.875}rem`}}>
                    {advArray.map((item: any,index) => {
                        return <Transition timeout={0} in={advLoopIndex === index} enter={false} exit={false} key={index}>{
                            (status) => {
                                return (<div className={`flex absolute absolute-b absolute-l absolute-r padding-xs radius-sm bg-white fade-fadeInLeft-init fade-fadeInLeft-${status}`}
                                             onClick={() => navigator(item.advertLink)} style={{maxWidth: `${422/46.875}rem`}}>
                                    <div className={''} style={{width: `${92/46.875}rem`,height: `${92/46.875}rem`}}>
                                        <img className={'container object-fit-cover'} src={item.advertImgUrl} alt="" />
                                    </div>
                                    <div className={'basis-xl hidden margin-left-sm'}>
                                        <p className={'text-black text-lg text-hidden'}>{item.title}</p>
                                        <p className={'text-red text-df text-hidden'}>￥{item.money}</p>
                                    </div>
                                </div>)
                            }
                        }</Transition>
                    })}
                    {ObjectDetection.isPlainObject(userInfo)?<div className={'fr'} style={{width: `${120/46.875}rem`,height: `${150/46.875}rem`}}>
                        {userInfo.payStatus?'':<NavLink to={`/skillupgrade?userId=${userInfo.userId}`}>
                            <img className={'container'}
                                 src={require('../../../assets/images/myStartLive.gif')} alt="" />
                        </NavLink>}
                    </div>:''}
                </div>
            </div>
        </ScrollView>
    </div>)
}

export default connect(mapStateToProps,mapDispatchToProps)(WxVideoPlay);

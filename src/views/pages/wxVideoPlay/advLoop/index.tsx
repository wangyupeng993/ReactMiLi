import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Transition} from "react-transition-group";
import {connect} from "react-redux";
import {mapStateToProps,mapDispatchToProps} from "../../../../redux/mapProps";
import ObjectDetection from "../../../../api/methods/validator";
import service from "../../../../api/service";

function AdvLoop(props: any) {
    const [userInfo] = useState(props.userInfo);
    const [videoId] = useState(ObjectDetection.GetUrlParam('videoId'));
    const [advLoopIndex,setLoopIndex] = useState(0);
    const [advArray,setAdvArray] = useState([]);
    let [advInterval,setAdvInterval] = useState(0);
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
    useEffect(() => {
        queryVideoAdv();
        return () => {
            clearInterval(advInterval);
            setAdvInterval(advInterval);
        }
    },[])
    return (<div className={'absolute absolute-l absolute-r padding-xs text-xl text-white margin-left-sm'}
                 style={{bottom: `${94/46.875}rem`}}>
            {advArray.map((item: any,index) => {
                return <Transition timeout={0} in={advLoopIndex === index} enter={false} exit={false} key={index}>{
                    (status) => {
                        return (<div className={`flex absolute absolute-b absolute-l absolute-r padding-xs radius-sm bg-white fade-fadeInLeft-init fade-fadeInLeft-${status}`}
                                     onClick={() => window.open(item.advertLink,'_self')}
                                     style={{maxWidth: `${422/46.875}rem`}}>
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
                         src={require('../../../../assets/images/myStartLive.gif')} alt="" />
                </NavLink>}
            </div>:''}
    </div>)
};

export default connect(mapDispatchToProps,mapStateToProps)(AdvLoop);

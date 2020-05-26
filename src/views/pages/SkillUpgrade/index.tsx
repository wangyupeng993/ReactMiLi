import React,{useState,useEffect} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {arrayDimension} from "../../../api/methods/common";
import ObjectDetection from "../../../api/methods/validator";
import {privilege} from './utils';
import {ScrollView,SwiperView} from "../../../components/index";
import service from "../../../api/service";

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

function Skill(props:any) {
    const [userId] = useState(ObjectDetection.GetUrlParam('userId'));
    const [userInfo,setUserInfo] = useState(props.userInfo);
    useEffect(() => {
        if (Object.prototype.toString.call(userId) === '[object Null]'||ObjectDetection.isNull(userId)) {
            window.open('https://xmmlwl.com/wechatlogin','_self');
            return ;
        }
        service.getUserInfo({userId}).then(response => {
            if (ObjectDetection.isPlainObject(response)) {
                const {userInfo} = response;
                props.getUserInfo(userInfo);
                sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                setUserInfo(userInfo);
            }
        }).catch(error => {})
        return () => {}
    },[])
    return (<div className={'container flex direction-column'}>
        <div className={'basis-max hidden'}>
            <ScrollView scrollY className={'bg-grayLight'}>
                <div className={'skillupgrade flex direction-column justify-end'}>
                    <div className={'margin-lr bg-white radius-lrt padding-sm'}>
                        <div className={'flex padding-bottom-sm solid-bottom'}>
                            <div className={'basis-min'}>
                                <img className={'round'}
                                     style={{width: `${88/46.875}rem`,height: `${88/46.875}rem`}}
                                     src={userInfo.userImg}
                                     alt="" />
                            </div>
                            <div className={'basis-lg margin-lr-sm'}>
                                <p className={'text-lg text-black text-bold'}>{userInfo.userName}</p>
                                <p className={'text-df text-gray padding-top-xs'}>{userInfo.payStatus?'已开通':'未开通'}</p>
                            </div>
                            <div className={'basis-xs flex items-center'}>
                                <NavLink to={`/upgradepayment?userId=${userInfo.userId}`}>
                                    <button className={'bg-darkYellow text-sm text-black white-nowrap padding-lr-sm padding-tb-xs radius-round-sm shadow'}>
                                        {userInfo.payStatus?'立即续费':'立即开通'}
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                        <div className={'padding-tb-xs'}>
                            <div className={'flex padding-tb-xs'}>
                                <div className={'basis-xl text-gray text-df'}>技术服务费（店铺版）</div>
                                <div className={'basis-xs text-df text-darkYellow'}>¥399/年</div>
                            </div>
                            <div className={'flex padding-top-xs'}>
                                <div className={'basis-xl text-gray text-df'}>商户名称</div>
                                <div className={'basis-xs text-df text-darkYellow'}>蜜梨销客</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'bg-darkbrown'}>
                    <SwiperView className={'padding-tb'} scrollX>
                        {arrayDimension(privilege,4).map((item,index) => {
                            return (<div className={'fl flex'} style={{width:'100vw'}} key={index}>
                                {item.map((child:any,index:number) => {
                                    return (<div className={'basis-df text-center'} key={index}>
                                        <span className={'bg-white line-height-sm inline-block text-darkbrown round'}
                                              style={{width:`${80/46.875}rem`,height: `${80/46.875}rem`}}>
                                            <i className={`${child.icon} text-xxl`}></i>
                                        </span>
                                        <p className={'text-white text-df padding-tb-sm'}>{child.title}</p>
                                    </div>)
                                })}
                            </div>)
                        })}
                    </SwiperView>
                </div>
                <div className={'padding-bottom-xs'}>
                    <div className={'padding-tb-df text-black text-center'}>技术服务内容</div>
                    <div className={'text-indent-sm text-gray text-df text-justify padding-lr margin-bottom-lg'}>
                        用户每年缴纳399元技术服务费能更方便的推广，更有效的 做营销展示、更全面拓展社交渠道价值，更直接的实现商业变现！
                    </div>
                    {privilege.map(item => {
                        return (<div className={'flex margin-lr bg-white radius-sm padding-sm shadow margin-bottom-df'}
                                     key={item.id}>
                            <div className={'basis-min flex items-center text-darkbrown'}>
                                <i className={`${item.icon} text-xsl`}></i>
                            </div>
                            <div className={'basis-max margin-lr-sm'}>
                                <p className={'text-lg text-darkbrown padding-tb-xs'}>{item.title}</p>
                                <p className={'text-sm text-gray'}>{item.description}</p>
                            </div>
                        </div>)
                    })}
                </div>
            </ScrollView>
        </div>
        <NavLink to={`/upgradepayment?userId=${userInfo.userId}`}>
            <div className={'padding-tb-sm bg-darkYellow text-lg text-black text-bold text-center'}>
                {userInfo.payStatus?'立即续费':'立即开通'}
            </div>
        </NavLink>
    </div>)
}
// 通过connect 链接组件和redux数据，传递state数据和dispatch方法
export default connect(mapStateToProps,mapDispatchToProps)(Skill);

import React,{useState,useEffect} from "react";
import ObjectDetection from "../../../api/methods/validator";
import {connect} from "react-redux";
import service from "../../../api/service";
import {wxConfig,wxRequestPayment} from "../../../api/methods/common";
import {ScrollView} from "../../../components/index";

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

function SkillPay (props: any) {
    const [payment,setPaymente] = useState({
        amount: 399,
        year: 1
    })
    const [userInfo,setUserInfo] = useState(props.userInfo);
    const paymentYear = (year:number) => {
        setPaymente({
            amount: 399,
            year: year
        })
    };
    const wxPayment = async () => {
        try {
            const wxOptions = await service.getWxConfig({url: window.location.href.split('#')[0]});
            await wxConfig({
                appId:wxOptions.appid,
                nonceStr:wxOptions.nonceStr,
                signature: wxOptions.signature,
                timestamp: Number(wxOptions.timestamp)
            }).then(async (wx:any) => {
                const wxOrder:{object:wxPaymentOptions} = await service.wxUnifiedOrder({
                    outOrderNo:0,
                    userId: userInfo.userId,
                    parentId: 0,
                    payMoney: payment.amount
                });
                if (ObjectDetection.isWeex()) {
                    wx.miniProgram.getEnv(async (response:{miniprogram:boolean}) => {
                        if (response.miniprogram) {
                            wx.miniProgram.navigateTo({url: '/pages/views/webViewPay/webViewPay?type=member'});
                        }else{
                            const {nonceStr,paySign,timeStamp,signType} = wxOrder.object;
                            const wxPayOptions = await wxRequestPayment({
                                nonceStr,paySign,timeStamp,signType,
                                package: wxOrder.object.package
                            }).then(() => {
                                service.userWxPayStatus({userId: userInfo.userId})
                                    .then(response => {
                                        setUserInfo({...userInfo,payStatus: response.payStatus})
                                        sessionStorage.setItem('userInfo',JSON.stringify({
                                            ...userInfo,
                                            payStatus: response.payStatus
                                        }));
                                    })
                            });
                        }
                    })
                }
            });
        }catch (e) {}
    }

    useEffect(() => {
        if (ObjectDetection.isNull(userInfo.userId)) {
            window.open('https://xmmlwl.com/wechatlogin','_self');
            return ;
        }

        return () => {}
    },[])

    return (<div className={'container flex direction-column'}>
        <div className={'basis-max hidden'}>
            <ScrollView scrollY>
                <div className={'UpgradePayment flex direction-column justify-end'}>
                    <div className={'margin-lr bg-white radius-lrt padding-tb-sm padding-lr-df'}>
                        <div className={'flex padding-tb-sm solid-bottom text-df'}>
                            <div className="basis-xs margin-right-sm text-gray white-nowrap">支付方式</div>
                            <div className="basis-xl text-darkYellow">在线支付</div>
                        </div>
                        <div className={'flex padding-tb-sm solid-bottom text-df'}>
                            <div className="basis-xs margin-right-sm text-gray white-nowrap">购买年限</div>
                            <div className="basis-xl flex">
                                <div className={`basis-xs margin-right-xl ${payment.year === 1?'text-darkYellow':'text-gray'}`}
                                     onClick={() => paymentYear(1)}>
                                    <i className={`${payment.year === 1?'cuIcon-roundcheckfill':'cuIcon-roundcheck'}`}></i> 1年
                                </div>
                            </div>
                        </div>
                        <div className={'flex padding-tb-sm solid-bottom text-df'}>
                            <div className="basis-xs margin-right-sm text-gray white-nowrap">应付金额</div>
                            <div className="basis-xl text-darkYellow">￥{payment.year * payment.amount}</div>
                        </div>
                    </div>
                </div>
                <div className={'flex padding-lr-df padding-bottom-sm margin-lr bg-white shadow radius-lrb text-df'}>
                    <div className={'basis-xs text-gray white-nowrap margin-right white-nowrap'}>收货地址</div>
                    <div className={'basis-lg text-darkYellow'}>上门服务</div>
                    <div className={'basis-min text-darkYellow'}>
                        <i className={'cuIcon-right fr text-xl'}></i>
                    </div>
                </div>
                <div className={'text-gray text-sm text-center padding-tb-df'}>
                    <i className={'text-darkYellow'}>* </i>
                    开通即视为同意 <i className={'text-darkYellow'}>《多点播用户协议》</i>关于会员升级的相关内容</div>
            </ScrollView>
        </div>
        <div onClick={() => wxPayment()}
             className={'padding-tb-sm bg-darkYellow text-black text-lg text-bold text-center'}>
            立即支付
        </div>
    </div>);
};
export default connect(mapStateToProps,mapDispatchToProps)(SkillPay);



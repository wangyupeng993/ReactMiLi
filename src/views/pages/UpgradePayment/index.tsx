import React,{useState,useEffect} from "react";
import ObjectDetection from "../../../api/methods/validator";
import service from "../../../api/service";
function SkillPay () {
    const [payment,setPaymente] = useState({
        amount: 399,
        year: 1
    })
    const [userId,setUserId] = useState(ObjectDetection.GetUrlParam('userId'));
    const paymentYear = (year:number) => {
        setPaymente({
            amount: 399,
            year: year
        })
    };

    useEffect(() => {
        if (Object.prototype.toString.call(userId) === '[object Null]'||userId === '') {
            window.open('https://xmmlwl.com/wechatlogin','_self');
            return ;
        }
        service.wxUnifiedOrder({userId}).then(response => {
            console.log(response,'===================')
        }).catch(error => {})
        return () => {}
    },[])

    return (<div className={'container flex direction-column'}>
        <div className={'flex-grow-min hidden'}>
            <div className={'UpgradePayment flex direction-column justify-end'}>
                <div className={'margin-lr bg-white radius-lrt padding-tb-sm padding-lr-df'}>
                    <div className={'flex padding-tb-sm solid-bottom text-df'}>
                        <div className="basis-xs margin-right-sm text-gray">支付方式</div>
                        <div className="basis-xl text-darkYellow">在线支付</div>
                    </div>
                    <div className={'flex padding-tb-sm solid-bottom text-df'}>
                        <div className="basis-xs margin-right-sm text-gray">购买年限</div>
                        <div className="basis-xl flex">
                            <div className={`basis-xs margin-right-xl ${payment.year === 1?'text-darkYellow':'text-gray'}`}
                                 onClick={() => paymentYear(1)}>
                                <i className={`${payment.year === 1?'cuIcon-roundcheckfill':'cuIcon-roundcheck'}`}></i> 1年
                            </div>
                            {/*<div className={`basis-xs margin-right-sm ${payment.year === 3?'text-darkYellow':'text-gray'}`}
                                 onClick={() => paymentYear(3)}>
                                <i className={`${payment.year === 3?'cuIcon-roundcheckfill':'cuIcon-roundcheck'}`}></i> 3年
                            </div>*/}
                        </div>
                    </div>
                    <div className={'flex padding-tb-sm solid-bottom text-df'}>
                        <div className="basis-xs margin-right-sm text-gray">应付金额</div>
                        <div className="basis-xl text-darkYellow">￥{payment.year * payment.amount}</div>
                    </div>
                </div>
            </div>
            <div className={'flex padding-lr-df padding-bottom-sm margin-lr bg-white shadow radius-lrb text-df'}>
                <div className={'basis-xs text-gray white-nowrap margin-right'}>收货地址</div>
                <div className={'basis-lg text-darkYellow'}>上门服务</div>
                <div className={'basis-min text-darkYellow'}>
                    <i className={'cuIcon-right fr text-xl'}></i>
                </div>
            </div>
            <div className={'text-gray text-sm text-center padding-tb-df'}>
                <i className={'text-darkYellow'}>* </i>
                开通即视为同意 <i className={'text-darkYellow'}>《多点播用户协议》</i>关于会员升级的相关内容</div>
        </div>
        <div className={'padding-tb-sm bg-darkYellow text-black text-lg text-bold text-center'}>
            立即支付
        </div>
    </div>);
}
export default SkillPay;



import wx from 'weixin-jsapi';
export const arrayDimension = (array: Array<any>,num: number) => {
    const objArray = [...array];
    const newArray = [];
    while (objArray.length > 0) {
        newArray.push(objArray.splice(0,num))
    }
    return newArray;
}

export function wxConfig (data:wxConfigOptions) {
    return new Promise((resolve,reject) => {
        const {appId,nonceStr, signature, timestamp} = data;
        wx.config({
            debug: true,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: ['chooseWXPay','miniProgram']
        });
        wx.ready(() => {
            resolve(wx);
        });
        wx.error((error:any) => {
            reject(error)
        });
    })
}

export function wxRequestPayment(data: wxPaymentOptions) {
    return new Promise((resolve, reject) => {
        const {signType,nonceStr,paySign,timeStamp} = data;
        wx.chooseWXPay({
            signType,nonceStr,paySign,timestamp:timeStamp,package: data.package,
            success: (response:any) => {
                resolve(response);
            },
            fail: (error:any) => {
                reject(error);
            }
        })
    });
};

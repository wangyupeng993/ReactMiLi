const wx = require('weixin-js-sdk');
export const arrayDimension = (array: Array<any>,num: number) => {
    const objArray = [...array];
    const newArray = [];
    while (objArray.length > 0) {
        newArray.push(objArray.splice(0,num))
    }
    return newArray;
}

export function wxConfig (data:{appId:string,nonceStr:string,signature:string,timestamp:string}) {
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

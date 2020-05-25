import request from '../../utils/request/index';

const service = {
    getWxConfig: (data: {url: string}) => request({
        url: '/wechatParam',
        method: 'POST',
        data
    }),
    getUserInfo: (data:any):Promise<any> => request({
        url: '/querySmallUserInfo',
        method: 'POST',
        data
    }),
    wxUnifiedOrder: (data: {outOrderNo:number,userId: string,payMoney: number,parentId: number}):Promise<any> => request({
        url: '/doUnifiedOrder',
        method: 'POST',
        data
    })
}

export default service;

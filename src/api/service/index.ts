import request from '../../utils/request/index';

const service = {
    getWxConfig: (data: {url: string}):Promise<any> => request({
        url: '/wechatParam',
        method: 'POST',
        data
    }),
    getUserInfo: (data:any):Promise<any> => request({
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url: '/querySmallUserInfo',
        method: 'POST',
        data
    }),
    wxUnifiedOrder: (data: {outOrderNo:number,userId: string,payMoney: number,parentId: number}):Promise<any> => request({
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url: '/doUnifiedOrder',
        method: 'POST',
        data
    }),
    userWxPayStatus: (data: {userId: string}):Promise<any> => request({
        url: `/queryUserPayStatus?userId=${data.userId}`,
        method: 'POST'
    })
}

export default service;

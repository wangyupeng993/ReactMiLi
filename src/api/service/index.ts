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
    }),
    queryVideoPlay: (data: {liveId: number, openId?:string}):Promise<any> => request({
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        url: `/queryLiveInfo`,
        method: 'POST',
        data
    }),
    queryVideoAdv: (data: {liveId: number}):Promise<any> => request({
        url: `/queryUserLiveAdvert?liveId=${data.liveId}`,
        method: 'GET'
    })
}


export default service;

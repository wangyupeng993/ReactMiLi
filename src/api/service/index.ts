import request from '../../utils/request/index';

const service = {
    getUserInfo: (data:any):Promise<any> => request({
        url: '/queryUserAllInfo',
        method: 'POST',
        data
    }),
    wxUnifiedOrder: (data: {userId: string}):Promise<any> => request({
        url: '/doWechatUnifiedOrder',
        method: 'POST',
        data
    })
}

export default service;

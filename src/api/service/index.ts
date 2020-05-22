import request from '../../utils/request/index';

const service = {
    getUserInfo: (data: {userId: string}):Promise<any> => request({
        url: '/queryUserAllInfo',
        method: 'POST',
        data
    })
}

export default service;

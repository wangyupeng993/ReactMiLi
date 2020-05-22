import axios from 'axios';
const URL:string = process.env.NODE_ENV === 'development'?'/api':'https://xmmlwl.com/api';
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
const service = axios.create({
    baseURL: URL,
    timeout: 50000,
    responseType: 'json',
    // 向后端发送请求
    transformRequest: [response => response],
    // 后端返回数据
    transformResponse: [response => response]
});

// 请求前拦截
service.interceptors.request.use((config:any):any => {
    if (config.method === 'post'&&config.headers['Content-Type'] === 'application/json;charset=UTF-8') {
        config.data = JSON.stringify(config.data);
    }
    return config;
    },
    (error:any): Promise<any> => Promise.reject(error))

// 请求响应后拦截
service.interceptors.response.use(response => {
    let JSONOBJ = null;
    try {
        JSONOBJ = JSON.parse(response.data);
    } catch (e) {
        JSONOBJ = response.data;
    }
    return JSONOBJ;
}, error => {
    return Promise.reject(error)
});

export default service;

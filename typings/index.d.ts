interface ScrollViewProps {
    scrollX?: boolean
    scrollY?: boolean
    // 开启下拉刷新的动作
    pullingDown?: boolean
    // 开启上拉加载的动作
    pullingUp?: boolean
    // 滚动到顶部/左边 多少距离时触发
    scrolltoupper?: number
    // 滚动到底部/右边多少距离时触发
    scrolltolower?: number
    // 初始化事件
    beforeCreate?: Function
    // 滚动事件
    onScroll?: Function
    // 滚动结束
    onScrollEnd?: Function
    // 上拉加载
    onScrollUp?:Function
    // 下拉刷新
    onScrollDown?:Function
    className?:string|object
    children?: string|object|Array<any>
}

interface SwiperViewOptions {
    loop?:boolean
    scrollX?: boolean
    scrollY?: boolean
    children?: string|object|Array<any>
    className?:string|object
}

interface wxConfigOptions {
    appId: string
    nonceStr: string
    signature: string
    timestamp: number,
    success?: Function,
    fail?: Function
}

interface wxPaymentOptions {
    nonceStr: string
    orderNo?: string
    package: string
    paySign: string
    signType: string
    timeStamp: string
}

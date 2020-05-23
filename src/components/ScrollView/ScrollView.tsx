import React,{useEffect,useRef,RefObject} from 'react';
import BScroll from 'better-scroll';
function ScrollView (props:ScrollViewProps) {
    const wrapper:RefObject<any> = useRef();
    /*const scrolltoupper = props.scrolltoupper?props.scrolltoupper:100;
    const scrolltolower = props.scrolltolower?props.scrolltolower:100;*/
    let scroll:any = null;
    const BScrollInit = () => {
        scroll = new BScroll(wrapper.current, {
            probeType: 3,
            scrollX: props.scrollX,
            scrollY: props.scrollY,
            click: true
        })

        if (scroll.enabled&&props.beforeCreate) {
            props.beforeCreate(scroll);
            scroll.refresh();
        }

        // 监听滚动事件
        if (props.onScroll) {
            scroll.on('scroll', (pos:any) => {
                props.onScroll&&props.onScroll(scroll,pos);
            });
        }

        // 监听滚动结束事件
        if (props.onScrollEnd) {
            scroll.on('scrollEnd', (pos:any) => {
                props.onScrollEnd&&props.onScrollEnd(scroll,pos);
                scroll.refresh();
            });
        }

        // 上拉加载更多
        if (props.onScrollDown) {
            scroll.on('pullingDown', (pos:any) => {
                props.onScrollDown&&props.onScrollDown(scroll,pos);
                scroll.refresh();
            })
            /*scroll.on('touchEnd', (pos:any) => {
                // 上拉加载更多
                if (scroll.maxScrollY >= (pos.y + scrolltolower)||scroll.maxScrollX >= (pos.x + scrolltolower)) {
                    props.onScrollUp&&props.onScrollUp(scroll,pos);
                }

                // 下拉刷新
                if (pos.y > scrolltoupper||pos.x > scrolltoupper) {
                    props.onScrollDown&&props.onScrollDown(scroll,pos);
                }
            });*/
        }
        // 下拉刷新
        if (props.onScrollUp) {
            scroll.on('pullingDown', (pos:any) => {
                props.onScrollUp&&props.onScrollUp(scroll,pos)
            })
        }
    }
    useEffect(() => {
        BScrollInit();
        return () => {}
    },[])
    return (<div ref={wrapper} className={`container ${props.className}`}>
        <div className={''}>{props.children}</div>
    </div>)
};

export default ScrollView;

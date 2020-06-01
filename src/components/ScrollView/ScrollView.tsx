import React,{useEffect,useRef,RefObject} from 'react';
import BScroll from 'better-scroll';
import ObjectDetection from "../../api/methods/validator";
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
        });
        scroll.refresh();

        if (scroll.enabled&&props.beforeCreate) {
            props.beforeCreate(scroll);
        }

        // 监听滚动事件
        scroll.on('scroll', (pos:any) => {
            const iosVersion = ObjectDetection.iosVersion();
            if (iosVersion >= 13.4&&props.scrollY&&pos.y <= scroll.maxScrollY||iosVersion >= 13.4&&props.scrollY&&pos.y >= 0||iosVersion >= 13.4&&props.scrollX&&pos.x <= scroll.maxScrollX||iosVersion >= 13.4&&props.scrollX&&pos.x >= 0) {
                scroll.stop();
            }
            props.onScroll&&props.onScroll(scroll,pos);
        });


        /*scroll.on('touchEnd',(pos:any) => {
            const iosVersion = ObjectDetection.iosVersion();
            if (iosVersion >= 13.4&&props.scrollY&&pos.y <= scroll.maxScrollY) {
                scroll.scrollTo(0,scroll.maxScrollY);
            }
            if (iosVersion >= 13.4&&pos.y >= 0) {
                scroll.scrollTo(0,0);
            }
        })*/

        // 监听滚动结束事件
        scroll.on('scrollEnd', (pos:any) => {
            const iosVersion = ObjectDetection.iosVersion();
            if (iosVersion >= 13.4&&props.scrollY&&pos.y <= scroll.maxScrollY) {
                scroll.scrollTo(0,scroll.maxScrollY);
            }
            if (iosVersion >= 13.4&&props.scrollY&&pos.y >= 0) {
                scroll.scrollTo(0,0);
            }
            if (iosVersion >= 13.4&&props.scrollX&&pos.x <= scroll.maxScrollX) {
                scroll.scrollTo(scroll.maxScrollX,0);
            }
            if (iosVersion >= 13.4&&props.scrollX&&pos.x >= 0) {
                scroll.scrollTo(0,0);
            }
            props.onScrollEnd&&props.onScrollEnd(scroll,pos);
        });

        // 监听滚动结束事件

        // 上拉加载更多
        if (props.onScrollDown) {
            scroll.on('pullingDown', (pos:any) => {
                props.onScrollDown&&props.onScrollDown(scroll,pos);
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
        return () => {
            scroll.destroy();
        }
    },[])
    return (<div ref={wrapper} className={`container hidden ${props.className?props.className:''}`}>
        <div className={''}>{props.children}</div>
    </div>)
};

export default ScrollView;

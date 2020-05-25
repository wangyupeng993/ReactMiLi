import React, {RefObject, useRef,useEffect,useState} from 'react';
import BScroll from "better-scroll";

function SwiperView (props: SwiperViewOptions) {
    const [navs,setState] = useState(0);
    const wrap:RefObject<any> = useRef();
    let childNum:any = props.children;
    let swiper:any = null;
    const BScrollInit = () => {
        swiper = new BScroll(wrap.current,{
            scrollX: props.scrollX,
            scrollY: props.scrollY,
            momentum: false,
            click: true,
            snap: {
                loop: props.loop,
                threshold: 0.2
            }
        });
        swiper.on('scrollEnd', () => {
            setState(swiper.getCurrentPage().pageX);
        })
    };

    useEffect(() => {
        BScrollInit();
        return () => {}
    },[])

    return (<div ref={wrap} className={`container relative hidden ${props.className}`}>
        <div className={''} style={{width: `${childNum.length?childNum.length:1}00%`}}>
            {props.children}
        </div>
        <div className={'absolute absolute-b absolute-l absolute-r text-center'}>
            {childNum.length?childNum.map((item:any,index:any) => {
                return (<span className={`inline-block padding-xs margin-lr-xs round ${navs === index?'bg-white':'bg-black-transparant'}`}
                              key={index}></span>)
            }):''}
        </div>
    </div>)
};

export default SwiperView;

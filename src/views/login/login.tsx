import React from 'react';
import {connect} from "react-redux";
import ScrollView from "../../components/ScrollView/ScrollView";
function Login (props:any) {
    console.log(props,'====================')
    return (<ScrollView scrollY pullingDown pullingUp>
            <div style={{height: '110vh'}}>登录页面</div>
        </ScrollView>)
};

/*
* 将需要的state的节点注入到与此视图数据相关的组件上
* state：redux 数据
* props：外部组件或者父组件传递过来的数据
 */
const mapStateToProps = (state:any,props:any) => state

// 将需要绑定的响应事件注入到组件上
const mapDispatchToProps = (dispatch:any) => {
    return {}
}

// 通过connect 链接组件和redux数据，传递state数据和dispatch方法
export default connect(mapStateToProps,mapDispatchToProps)(Login);

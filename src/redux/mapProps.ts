// 将需要绑定的响应事件注入到组件上
export const mapDispatchToProps = (dispatch: Function) => {
    return {
        getUserInfo: (payload:{userId: string,userNam: string}) => dispatch({type: 'getUserInfo', payload: {userInfo: payload}})
    }
}

/*
* 将需要的state的节点注入到与此视图数据相关的组件上
* state：redux 数据
* props：外部组件或者父组件传递过来的数据
 */
export const mapStateToProps = (state: any,props: any) => {
    return {
        userInfo: state.User&&state.User.userInfo||JSON.parse(sessionStorage.getItem('userInfo') as string)
    }
}

import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import routes from "../../router/route";
import {connect} from "react-redux";
function App () {
    return (<React.Fragment>
        <div className={'container'}>
            <Switch>
                {routes.map(item => {
                    if (item.redirect) {
                        return <Route exact path={item.path} render={
                            () => <Redirect to={item.redirect} />
                        } key={item.path} ></Route>
                    } else {
                      return <Route path={item.path} component={item.component} key={item.path} />
                    }
                })}
                <Redirect to={'/NotFound'} />
            </Switch>
        </div>
    </React.Fragment>)
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

export default connect(mapStateToProps,mapDispatchToProps)(App);

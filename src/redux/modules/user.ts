const User = (state = {name: '这是 user redux'}, action:any) => {
    switch (action.type) {
        case 'getUserInfo':
            sessionStorage.setItem('userInfo',JSON.stringify(action.payload.userInfo));
            return action.payload.userInfo
        default:
            return state
    }
}

export default User

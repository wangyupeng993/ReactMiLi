const User = (state = {name: '这是 user redux'}, action:any) => {
    switch (action.type) {
        case 'getUserInfo':
            return action.payload
        default:
            return state
    }
}

export default User

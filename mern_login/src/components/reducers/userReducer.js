export function userReducer(state = null, action) {
    switch(action.type) {
        case 'LOGIN' :
            return action.payload
            case 'LOGOUT' :
                localStorage.clear()
                return action.payload

                    case 'OPEN_DRAWER' :
                        return action.payload
                        
                default : return state
    }
}
export default {
    SET_USERS(state, user){
        state.user = user;
    },
    SET_LoggedInStatus(state, status){
        state.isLoggedIn = status
    },
    SET_API_ERROR(state, error){
        state.apiError = error
    },
    SET_API_RESPONSE(state, data){
        state.apiResponse = data
    },
    SET_AutoLogout(state, data){
        state.autoLogout = data
    }
}
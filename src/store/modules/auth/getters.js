export default {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    authToken: (state) => state.token?.idToken,
    authAutoLogout: (state) => state.autoLogout
}
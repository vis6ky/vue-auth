import axios from "axios";
import CONSTANT from './../../constant'

let clearTimer = null;
export default {
    async login(context, payload){
      return await context.dispatch('doAuth', {
        ...payload,
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+CONSTANT.apiKey,
        login: true
      })
    },
    async signup(context, payload){
      return await context.dispatch('doAuth', {
        ...payload,
        url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+CONSTANT.apiKey,
        login: false
      })  
    },
    logout(context){
      context.commit('SET_API_RESPONSE', null)
      context.commit('SET_API_ERROR', null)
      context.commit('SET_USERS', null)
      localStorage.removeItem('user')
      if(clearTimer){
        clearInterval(clearTimer)
      }
    },
    async doAuth(context, payload){
      let userData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }
       try {
          const response = await axios.post(payload.url, userData);
          console.log(response)
          context.commit('SET_AutoLogout', false)
          context.commit('SET_API_ERROR', null)
          context.commit('SET_API_RESPONSE', {
            status: response.status,
            data: response.data
          })

          if(payload.login){
            const userDetails = {
              displayName: response.data.displayName,
              email: response.data.email,
              expiresIn: response.data.expiresIn,
              token: response.data.idToken,
              refreshToken: response.data.refreshToken
            }
            context.commit('SET_USERS', userDetails)
            localStorage.setItem('user', JSON.stringify(userDetails))
            context.dispatch('setAutoLogout', userDetails.expiresIn)
          }
          return true;
       } catch (error) {
          console.error('Error '+(payload.login ? 'signin':'signup')+' user data:', error);

          const status = error.response?.status || 500;
          const apiErrors = error.response?.data?.error?.errors || [];
          const message = error.response?.data?.error?.message || 'Signup failed.';

          context.commit('SET_API_RESPONSE', null)
          context.commit('SET_API_ERROR', {
            status,
            errors: apiErrors,
            message
          });
          return false;
       }
    },
    autoLogin(context){
      const userData = localStorage.getItem('user')
      if(userData){
        const userDetails = JSON.parse(userData)
        context.commit('SET_USERS', userDetails)
        context.dispatch('setAutoLogout', userDetails.expiresIn)
      } else {
        context.commit('SET_USERS', null)
      }
    },
    autoLogout(context){
      context.dispatch('logout')
      context.commit('SET_AutoLogout', true)
    },
    setAutoLogout(context, expiringTime){
      clearTimer = setTimeout(() => {
          context.dispatch('autoLogout')
        }, +expiringTime*1000)
    }
}
import auth from '@/api/auth'

const state = {
    user: null,
    isLogin: false
}

const getters = {
    user: state=> state.user,
    isLogin: state=> state.isLogin
}

const mutations = {
    setUser(state, payload) {
        state.user = payload.user
    },
    setLogin(state, payload) {
        state.isLogin = payload.isLogin
    }
}

const actions = {
    login({commit}, {username, password}) {
        return auth.login({username,password})  //这里return的是一个promise对象，
            .then(res=> {                       //这样的话就可以在后面用then
                commit('setUser', {user: res.data})
                commit('setLogin', {isLogin: true})
            })
    },
    //换一种写法，与上面等价
    async register({commit}, {username, password}) {
        let res = await auth.register({username, password})
        commit('setUser', {user: res.data})
        commit('setLogin', {isLogin: true})
        return true
    },

    async logout({commit}) {
        await auth.logout()
        commit('setUser', {user: null})
        commit('setLogin', {isLogin: false})
    },

    async checkLogin({commit, state}) {
        if(state.isLogin) return true
        let res = await auth.getInfo()
        commit('setLogin', {isLogin: res.isLogin})
        if(!res.isLogin) return false
        commit('setUser', {user: res.data})
        return true
    }
}
/*this.checkLogin().then(isLogin=>{}) 这里的isLogin指的是上面的true */
export default {
    state,
    getters,
    mutations,
    actions
}
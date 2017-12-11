const TOKENKEY = 'abp.token.key'
const USERKEY = 'abp.userinfo'
class AuthUtils {
    // 设置token
    setToken(token) {
        let tokenObj = {
            token
            // expireTime: expireTime.toString() // 2小时过期
        }
        localStorage.setItem(TOKENKEY, JSON.stringify(tokenObj))
    }

    // 获取token
    getToken() {
        let tokenStr = localStorage.getItem(TOKENKEY)
        // 如果获取不到
        if (!tokenStr) return null
        let tokenObj = JSON.parse(tokenStr)
        // 如果过期
        if (tokenObj.expireTime <= Date.now()) return null

        return tokenObj.token
    }
    //清空Token
    removeToken(){
        localStorage.removeItem(TOKENKEY)
    }
    // 设置和获取用户信息
    getUserInfo() {
        let userStr = localStorage.getItem(USERKEY)
        if (!userStr) return null
        return JSON.parse(userStr)
    }

    setUserInfo(user) {
        localStorage.setItem(USERKEY, JSON.stringify(user))
    }
    removeUserInfo(){
        localStorage.removeItem(USERKEY)
    }
}

export default new AuthUtils()
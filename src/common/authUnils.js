const TOKENKEY = 'abp.token.key'
const USERKEY = 'abp.userinfo'
class AuthUtils {
    // 设置token
    setToken(token,expireTime) {
        let tokenObj = {
            token,
            expireTime: expireTime 
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
        if (tokenObj.expireTime >= Date.now()) return null

        return tokenObj.token
    }
    //清空Token
    removeToken(){
        localStorage.removeItem(TOKENKEY)
    }
}

export default new AuthUtils()
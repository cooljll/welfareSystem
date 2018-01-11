const TOKENKEY = 'abp.token.key'
const USERKEY = 'abp.userinfo'
class AuthUtils {
    // 设置token
    setToken(token) {
        localStorage.setItem(TOKENKEY, JSON.stringify(token))
    }
    // setToken(token,expireTime) {
    //     let tokenObj = {
    //         token,
    //         expireTime: expireTime 
    //     }
    //     localStorage.setItem(TOKENKEY, JSON.stringify(tokenObj))
    // }

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
    //删除cookie
    delCookie(name){
        var date=new Date()          
        date.setTime(date.getTime()-10000)           
        document.cookie = name + "=;expires=" + (new Date(0)).toGMTString()+";domain=192.168.1.197;path=/"
    }
}

export default new AuthUtils()
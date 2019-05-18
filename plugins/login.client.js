const Cookie = require('js-cookie')
export default function({ store }) {
  const cookieUserInfo = Cookie.get('user_info')
    ? JSON.parse(Cookie.get('user_info'))
    : null

  const cookieAuth = Cookie.get('auth') ? Cookie.get('auth') : null

  if (!cookieUserInfo || !cookieAuth) return false

  store.commit('login/setAuth', cookieAuth)
  store.commit('currentUser/setUser', cookieUserInfo)
}

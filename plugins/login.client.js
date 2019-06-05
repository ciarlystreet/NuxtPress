import { SET_AUTH, SET_USER } from '~/store/auth'
const Cookie = process.client ? require('js-cookie') : undefined
export default function({ app, redirect, env, store }) {
  app.router.beforeEach((to, from, next) => {
    const cookieAuth = Cookie.get('auth')
    const cookieUserInfo = Cookie.get('user_info')
    if (cookieAuth && cookieUserInfo) {
      store.commit(SET_AUTH, cookieAuth)
      store.commit(SET_USER, JSON.parse(cookieUserInfo))
      // if (from.path !== to.path) return redirect(env.LOGGED_IN_USER_REDIRECT)
    } // else if (false) {
    // return redirect(env.AUTH_LOGIN_PAGE)
    // }

    next()
  })
}

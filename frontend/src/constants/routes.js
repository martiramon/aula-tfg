import { AulesPage, LoginPage, SignupPage } from '../pages'

export const routes = {
    login: { url: '/login', private: false, component: LoginPage },
    signup: { url: '/signup', private: false, component: SignupPage },
    aules: { url: '/aules', private: true, component: AulesPage },
}

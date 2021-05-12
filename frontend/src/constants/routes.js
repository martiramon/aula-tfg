import { LoginPage, SignupPage } from '../pages'

export const routes = {
    login: { url: '/login', private: false, component: LoginPage },
    signup: { url: '/signup', private: false, component: SignupPage },
}

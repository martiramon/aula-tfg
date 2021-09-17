import {
    AulesPage,
    CrearTestPage,
    LoginAlumePage,
    LoginPage,
    SignupPage,
    RespondreTestPage,
    ResultatsTestPage,
} from '../pages'

export const routes = {
    login: { url: '/login', private: false, component: LoginPage },
    signup: { url: '/signup', private: false, component: SignupPage },
    aules: { url: '/aules', private: true, component: AulesPage },
    loginAlumne: { url: '/alumne', private: false, component: LoginAlumePage },
    crearTest: { url: '/crearTest', private: true, component: CrearTestPage },
    respondreTest: {
        url: '/respondreTest',
        private: false,
        component: RespondreTestPage,
    },
    resultatsTest: {
        url: '/resultatsTest',
        private: true,
        component: ResultatsTestPage,
    },
}

import {
    AulesPage,
    CrearTestPage,
    LoginAlumePage,
    LoginPage,
    SignupPage,
    RespondreTestPage,
    ResultatsTestPage,
    TriarAccesPage,
} from '../pages'

export const routes = {
    triarAcces: { url: '/aula', private: false, component: TriarAccesPage },
    login: { url: '/login', private: false, component: LoginPage },
    signup: { url: '/signup', private: false, component: SignupPage },
    aules: { url: '/aules', private: true, component: AulesPage },
    loginAlumne: { url: '/alumne', private: false, component: LoginAlumePage },
    crearTest: { url: '/crear-test', private: true, component: CrearTestPage },
    respondreTest: {
        url: '/respondre-test',
        private: false,
        component: RespondreTestPage,
    },
    resultatsTest: {
        url: '/resultats-test',
        private: true,
        component: ResultatsTestPage,
    },
}

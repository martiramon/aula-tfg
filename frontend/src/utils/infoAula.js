const idAula = 'aulaId'
const nomAula = 'aulaNom'
const nomProf = 'nom'
const testAula = 'test'

export const setAula = (aulaId, aulaNom, aulaTest) => {
    if (localStorage.getItem(nomProf)) {
        localStorage.setItem(idAula, aulaId)
        localStorage.setItem(nomAula, aulaNom)
        localStorage.setItem(testAula, aulaTest)
    } else {
        sessionStorage.setItem(idAula, aulaId)
        sessionStorage.setItem(nomAula, aulaNom)
        sessionStorage.setItem(testAula, aulaTest)
    }
}

export const getAula = () => {
    return localStorage.getItem(idAula) || sessionStorage.getItem(idAula)
}

export const getNomAula = () => {
    return localStorage.getItem(nomAula) || sessionStorage.getItem(nomAula)
}

export const getTestAula = () => {
    return localStorage.getItem(testAula) || sessionStorage.getItem(testAula)
}

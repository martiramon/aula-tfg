const idAula = 'aulaId'
const nomAula = 'aulaNom'
const nomProf = 'nom'

export const setAula = (aulaId, aulaNom) => {
    if (localStorage.getItem(nomProf)) {
        localStorage.setItem(idAula, aulaId)
        localStorage.setItem(nomAula, aulaNom)
    } else {
        sessionStorage.setItem(idAula, aulaId)
        sessionStorage.setItem(nomAula, aulaNom)
    }
}

const aulaId = 'aula'
const nomProf = 'nom'

export const setAula = (aula) => {
    if (localStorage.getItem(nomProf)) localStorage.setItem(aulaId, aula)
    else sessionStorage.setItem(aulaId, aula)
}

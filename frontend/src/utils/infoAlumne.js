const nomAlumne = 'nomAlumne'
const idAlumne = 'idAlumne'
const aulaAlumne = 'aulaAlumne'

export const getNomAlumne = () => {
    return sessionStorage.getItem(nomAlumne)
}

export const setNomAlumne = (nom) => {
    sessionStorage.setItem(nomAlumne, nom)
}

export const deleteNomAlumne = () => {
    sessionStorage.removeItem(nomAlumne)
}

export const getIdAlumne = () => {
    return sessionStorage.getItem(idAlumne)
}

export const setIdAlumne = (id) => {
    sessionStorage.setItem(idAlumne, id)
}

export const deleteEscola = () => {
    sessionStorage.removeItem(idAlumne)
}

export const getAulaAlumne = () => {
    return sessionStorage.getItem(aulaAlumne)
}

export const setAulaAlumne = (aula) => {
    sessionStorage.setItem(aulaAlumne, aula)
}

export const deleteAulaAlumne = () => {
    sessionStorage.removeItem(aulaAlumne)
}

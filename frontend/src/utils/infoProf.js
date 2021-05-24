const nomProf = 'nom'
const escolaProf = 'escola'

export const getNom = () => {
    return localStorage.getItem(nomProf) || sessionStorage.getItem(nomProf)
}

export const setNom = (nom, isSession) => {
    if (isSession) sessionStorage.setItem(nomProf, nom)
    else localStorage.setItem(nomProf, nom)
}

export const deleteNom = () => {
    sessionStorage.removeItem(nomProf)
    localStorage.removeItem(nomProf)
}

export const getEscola = () => {
    return (
        localStorage.getItem(escolaProf) || sessionStorage.getItem(escolaProf)
    )
}

export const setEscola = (escola, isSession) => {
    if (isSession) sessionStorage.setItem(escolaProf, escola)
    else localStorage.setItem(escolaProf, escola)
}

export const deleteEscola = () => {
    sessionStorage.removeItem(escolaProf)
    localStorage.removeItem(escolaProf)
}

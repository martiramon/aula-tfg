const tokenId = 'username'
export const getToken = () => {
    return localStorage.getItem(tokenId) || sessionStorage.getItem(tokenId)
}

export const setToken = (token, isSession) => {
    if (isSession) sessionStorage.setItem(tokenId, token)
    else localStorage.setItem(tokenId, token)
}

export const deleteToken = () => {
    sessionStorage.removeItem(tokenId)
    localStorage.removeItem(tokenId)
}

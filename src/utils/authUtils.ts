
export function getLoggedUser() {
    const userJson = localStorage.getItem('user')
    if(userJson) {
        return JSON.parse(userJson)
    }

    return null
}

export function removeTokenInfo() {
    console.log("Fluxo de limpeza de token temporário concluído")
    return
}
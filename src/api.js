
let refresh;
export async function getTracks() {
    const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/')
    if (!response.ok) {
        throw new Error('Ошибка сервера')
    }
    const newData = await response.json()
    newData.forEach((el, index) => {
        el.id = index + 8
    })
    let data = newData
    return data

}


export async function getSelectionTracks() {
    const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/selection/')
    if (!response.ok) {
        throw new Error('Ошибка сервера')
    }
    const newData = await response.json()
    newData.forEach((el, index) => {
        el.id = index + 8
    })
    let data = newData
    return data
}

export async function registration(email, password, username) {
    const response = await fetch('https://skypro-music-api.skyeng.tech/user/signup/',
        {
            method: "POST",
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
                username: `${username}`,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).catch((error) => { alert(error.message) })
    getToken(email, password).then((response) => { let data = response.json(); return data })
        .then((data) => {
            localStorage.setItem('access', data.access)
        })
    return response
}

export async function login(email, password) {
    const response = await fetch('https://skypro-music-api.skyeng.tech/user/login/',
        {
            method: "POST",
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).catch((error) => { alert(error.message) })
    getToken(email, password).then((response) => { let data = response.json(); return data })
        .then((data) => {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            refresh = localStorage.getItem('refresh')
        })
    return response
}

export async function getToken(email, password) {
    const response = await fetch('https://skypro-music-api.skyeng.tech/user/token/',
        {
            method: "POST",
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).catch((error) => { alert(error.message) })
    return response
}

export async function getMyTracks(username) {
    const accessToken = localStorage.getItem('access')
    const response = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    if (response.status === 401) { throw new Error('Нужна авторизация2') }

    const newData = await response.json()
    newData.forEach((el, index) => {
        el.stared_user = username
        el.id_old = el.id
        console.log(el.id_old)
        el.id = index + 8;
        console.log(el.id)
    })
    let data = newData
    return data
}

export async function addMyTracks(id) {
    const accessToken = localStorage.getItem('access')
    const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    if (response.status === 401) { throw new Error('server error Необходима авторизация') }
    const data = await response.json()
    return data
}


export async function delMyTracks(id_old) {
    const accessToken = localStorage.getItem('access')
    const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id_old}/favorite/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await response.json()
    return data
}

export async function refreshToken() {
    let refreshToken = localStorage.getItem('refresh')
    try {
        const response = await fetch("https://skypro-music-api.skyeng.tech/user/token/refresh/", {
            method: "POST",
            body: JSON.stringify({
                refresh: `${refreshToken}`,
            }),
            headers: {
                "content-type": "application/json",
            },
        })
        const newToken = await response.json()
        localStorage.setItem('access', newToken.access)
        const newAccessToken = localStorage.getItem('access')
        return newAccessToken
    } catch (error) {
        alert('требуется ввод логина и пароля')
    }



}
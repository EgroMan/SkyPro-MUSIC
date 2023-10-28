
export async function getTracks() {
    const response = await fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/')

    if (!response.ok) {
        throw new Error('Ошибка сервера')
    }
    const data = await response.json()
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

export async function getMyTracks() {
    const accessToken = localStorage.getItem('access')
    const response = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const newData = await response.json()
    newData.forEach((el, index) => {
        el.id = index + 8; console.log(el)
    })
    console.log(newData)
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
    const data = await response.json()
    return data
}

export async function delMyTracks(id) {
    const accessToken = localStorage.getItem('access')
    const response = await fetch(`https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    const data = await response.json()
    return data
}
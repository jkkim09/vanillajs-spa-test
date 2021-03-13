/**
 * base url
 */
const baseUrl = 'http://event.assignment.dev-k8s.buzzni.net'

/**
 * api URL 반환한다.
 * 
 * @param {*} key api key
 * @param {*} params 파라미터
 * @returns api URL
 */
const getApiUrl = (key, params) => {
    let returnUrl
    switch(key) {
        case 'infoCheck':
            returnUrl = `${baseUrl}/event/${params.eventId}?user_id${params.userId}`
            break
        case 'sendResult':
            returnUrl = `${baseUrl}/event/${params.eventId}/answers`
            break
    }
    return returnUrl
}

/**
 * api get post 요청 구현
 */
const Api =  {
    get: async (key, params) => {
        const url = getApiUrl(key, params)
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    },
    post: async (key, params) => {
        const url = getApiUrl(key, params)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params.body)
        })
        return res
    }
}

export {Api}
import Home from './views/pages/Home.js'
import Error from './views/pages/Error.js'
import Result from './views/pages/Result.js'

import Utils from './services/utils.js'

/**
 * route 목록
 */
const routes = {
    '/' : Home ,
    '/error' : Error,
    '/result': Result
};

/**
 * hash 값 젼화 감지하여 화면 렌더링
 */
const router = async () => {
    const content = null || document.getElementById('page_container')
    const props = {
        userId: Utils.getParameterByName('user_id'),
        eventId: Utils.getParameterByName('event_id')
    }

    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/')
    let page = routes[parsedURL] ? routes[parsedURL] : Error

    content.innerHTML = await page.render(props)
    await page.after_render(props)
}

/**
 * window 로드시 화면을 렌더링 한다
 */
// window.addEventListener('load', router)

window.onload = () => {
    /**
     * hash값이 변화시 화면을 렌더링 한다
     */
    window.addEventListener('hashchange', router)
    router()
}

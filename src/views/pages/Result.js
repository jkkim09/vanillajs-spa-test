import {Api} from '../../services/api.js'
import Utils from '../../services/utils.js'

import ResultComponent from '../components/resultComponent.js'

/**
 *  payload: 설문 결과,
 *  parsingData: 설문결과 parsing 값,
 *  listJson: 설문 정보
 */
let State = {}

/**
 * 클릭 항목
 */
let Clicks = {}

const setState = (data) => {
    State = data
}

const getState = () => {
    return State
}

const setClicks = (data) => {
    Clicks = {...Clicks, ...data}
}

const getClicks = () => {
    return Clicks
}

const getPosts = async (eventId, userId) => {
   try {
        // 설문지 정보
        const listRes = await Api.get('infoCheck', {eventId, userId})
        const listJson = await listRes.json()
        
        // 설문 결과
        const res = await Api.get('sendResult', {
            eventId: eventId
        })
        const json = await res.json()

        if (res.ok === false && list.ok === false) {
            location.href = location.origin + '#/error'
        }

        const parsingData = Utils.resultDataParsing(json.payload)

        setState({
            payload: json.payload,
            parsingData: parsingData,
            listJson: listJson.payload
        })

        return {
            parsingData: parsingData,
            listJson: listJson.payload
        }
   } catch (err) {
       console.log('Error', err)
   }
}

/**
 * 항목 클릭 이벤트
 * 
 * @param {*} target 
 */
const targetClick = (target) => {
    const content = document.getElementById('page_container')
    const selectValue = {}
    const state = getState()
    const cliks = getClicks()
    const dataItem = target.getAttribute('data-item')
    
    if (!cliks[dataItem]) {
        selectValue[dataItem] = true
        setClicks(selectValue)
    } else {
        delete cliks[dataItem]
    }
    
    const itmes = Utils.selectUlsersItem(getClicks(), state)
    const component = ResultComponent({
        listJson: state.listJson,
        parsingData: Utils.resultDataParsing(itmes.length > 0 ? itmes : state.payload),
        select: getClicks()
    })

    content.innerHTML = component
    Result.after_render()
}

let Result = {
    render : async ({eventId, userId}) => {
        const {parsingData, listJson} = await getPosts(eventId, userId)
        return ResultComponent({parsingData, listJson})
    },
    after_render: () => {
        const liEls =document.getElementsByClassName('result__itemListLow')
        for (let u=0; u<liEls.length; u++) {
            liEls[u].addEventListener('click', targetClick.bind(this, liEls[u]))
        }
    }
}
export default Result
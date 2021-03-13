import {Api} from '../../services/api.js'
import Utils from '../../services/utils.js'

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
        return {
            parsingData: parsingData,
            listJson: listJson.payload
        }
   } catch (err) {
       console.log('Error', err)
   }
}

let Result = {
    render : async ({eventId, userId}) => {
        const {parsingData, listJson} = await getPosts(eventId, userId)

        const liEl = (item, index) => {
            const lowLi = (lowIndex, title, selectItem) => {
                const percen = (selectItem[lowIndex] / selectItem['total'] * 100).toFixed(1)
                return `
                    <li class='result__itemListLow'>
                        <div class='result__itemListLow--lows'>
                            <div class='result__itemList--low1'>${percen}%</div>
                            <div class='result__itemList--low2'>${title}</div>
                            <div class='result__itemList--low3'>${selectItem[lowIndex]}</div>
                        </div>
                        <div class='result__itemListLow--back' style='width:${percen}%'></div>
                    </li>
                `
            }

            if (item.block_type === 'select') {
                const id = item.id
                const selectItem = parsingData[id]       
                const options = item.option
                return `
                    <li class='mar-bot-10'>
                        <h1 class='result__item--title'>Q.${options.title}</h1>
                        <ul class='result__itemList'>
                            ${options.items.map((title, index) => {
                                return lowLi(index, title, selectItem)
                            }).join('\n')}
                        </ul>
                    </li>
                `
            }
            return ''
        }

        let view =  `
            <div class='result'>
                <h1 class='result__title mar-bot-10'>버즈니 채용 설문조사</h1>
                <div>
                    <ul>
                        ${listJson.blocks.map((item, index) => {
                            return liEl(item, index)
                        }).join('\n')}
                    </ul>
                </div>
            </div>
        `
        return view
    },
    after_render: () => {

    }
}
export default Result
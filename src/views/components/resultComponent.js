const ResultComponent = ({parsingData, listJson, select = {}}) => {
    const liEl = (item) => {
        const lowLi = (lowIndex, title, selectItem, id) => {
            const dataItme = `${id}-${lowIndex}`
            const percen = selectItem[lowIndex] >= 0 ? (selectItem[lowIndex] / selectItem['total'] * 100).toFixed(1) : 0
            return `
                <li class='result__itemListLow${select[dataItme] ? ' active': ''}' data-item='${dataItme}'>
                    <div class='result__itemListLow--lows'>
                        <div class='result__itemList--low1'>${percen}%</div>
                        <div class='result__itemList--low2'>${title}</div>
                        <div class='result__itemList--low3'>${selectItem[lowIndex] || 0}</div>
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
                            return lowLi(index, title, selectItem, id)
                        }).join('\n')}
                    </ul>
                </li>
            `
        }
        return ''
    }

    let component =  `
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
    return component
}

export default ResultComponent
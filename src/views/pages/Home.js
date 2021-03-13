import {Api} from '../../services/api.js'
/**
 * 설문조사 내용과 응모 여부 확인
 * 
 * @param {*} eventId event ID
 * @param {*} userId  user ID
 * @returns 
 */
const getPosts = async (eventId, userId) => {
    try {
        const res = await Api.get('infoCheck', {eventId, userId})
        const json = await res.json()

        if (res.ok === false) {
            location.href = location.origin + '#/error'
        }
        return json
    } catch (err) {
        console.log('Error', err)
    }
}

/**
 * 설문지 작성 요청
 * 
 * @param {*} param0 data
 */
const clickEvent = async ({item0, item1, item2, userId, eventId}) => {
    const set0 = []
    const set1 = []
    const set2 = []

    for (let i=0; i<item0.length; i++) {
        if (item0[i].checked === true) {
            set0.push(item0[i].value)
        }
    }

    for (let j=0; j<item1.length; j++) {
        if (item1[j].checked === true) {
            set1.push(item1[j].value)
        }
    }

    for (let k=0; k<item2.length; k++) {
        if (item2[k].checked === true) {
            set2.push(item2[k].value)
        }
    }

    /**
     * 작성 안된 설문지를 확인
     */
    if (set0.length > 0 && set1.length > 0 && set2.length > 0) {
        try {
            
            const res = await Api.post('sendResult', {
                eventId: eventId,
                body: {
                    user_id: userId,
                    value: {
                        13: set0,
                        14: set1,
                        16: set2
                    }
                }
            })
    
            if (!res.ok) {
                const resData = await res.json()
                alert(resData.description)
            } else {
                location.hash = '#/result'
            }
        } catch (err) {
            console.log('Error', err)
        }
    } else {
        alert('설문조사 문항중 선택되지 안은 문항이 있습니다.')
    }
}

/**
 * 설문지의 limit 을 확인하고 선택한다.
 * 
 * @param {*} elements input Element
 * @param {*} e   event
 */
const changeEvent = (elements, e) => {
    const selectMax = e.target.getAttribute('data-max')
    let maxCount = 0;
    for(let i=0; i < elements.length; i++ ) {
        if( elements[i].checked === true ){
            maxCount += 1;
        }
    }

    if (selectMax < maxCount) {
        e.target.checked = false
    }
}

const Home = {
    render : async ({userId, eventId}) => {
        if (userId.length === 0 || eventId.length === 0) {
            location.href = location.origin + '#/error'
        }

        const {payload} = await getPosts(eventId, userId)
        const selectEl = (item, index) => {
            const {block_type} = item
            let returnEl
            switch(block_type) {
                case 'select': 
                    returnEl = radioEl(item, index)
                break
                case 'image':
                    returnEl = imgEl(item)
                break
                case 'submit':
                    returnEl = submitEl(item)
            }
            return returnEl
        }

        const radioEl = (item, pindex) => {
            const options = item.option
            const inputType = Number(options.limit) > 1 ? 'checkbox' : 'radio'
            const itemEl = (items) => {
                const returnEl = items.map((item, index) => {
                    return `
                        <li class="mar-bot-10">
                            <input 
                                type="${inputType}" 
                                id=${'r'+ pindex + index}
                                name=${'check' + pindex}
                                data-max=${options.limit}
                                value=${index}>
                            <label for=${'r'+ pindex + index}>${item}</label>
                        </li>
                    `
                }).join('\n')
                return returnEl
            }
    
            return (
                `
                <div class="mainPage__block"
                    style='margin-bottom:${options.paddingBottom}px;'>
                    <h1 class="mainPage__blockTitle">${options.title}</h1>
                    <ul class="mainPage__blockList">
                        ${itemEl(options.items)}
                    </ul>
                </div>
                `
            )
        }

        const imgEl = ({option}) => {
            return `
                <div 
                    class='mainPage__itemImgArea' 
                    style='margin-bottom: ${option.paddingBottom}px;'>
                    <img 
                        src='${option.src}'
                        class='mainPage__itemImg'
                    />
                </div>
            `
        }

        const submitEl = ({option}) => {
            return `
                <div class='mainPage__submit' id='submit'
                    style='margin-bottom: ${option.paddingBottom}px;'>
                    <img class='mainPage__submit--img' src='${option.btnImg}'/>
                </div>
            `
        }
    

        const view = `
            <img class="mainPage__img" src="${payload.header_img}"/>
            <div class="mainPage__header bor-rad-5 mar-bot-10">
                <h1 class="mainPage__header--title mar-bot-10">버즈니 공개채용</h1>
                <div class="mainPage__subTitle bor-rad-5">
                    <h2 class="mainPage__subTitle--title">성장의 즐거움을 함께할 인재를 찾습니다.</h2>
                </div>
            </div>
            <div class="mainPage__list" style='background-color: ${payload.background_color}'>
            ${payload.blocks.map((item, index) => {
                return selectEl(item, index)
            }).join('\n')}
            </div>
        `
        return view
    },
    after_render: ({userId, eventId}) => {
        const submitButton = document.getElementById('submit')
        const radopFirst =document.getElementsByName('check0')
        const checkBoxFirst =document.getElementsByName('check1')
        const checkBoxSecond =document.getElementsByName('check3')
        
        submitButton.addEventListener('click', clickEvent.bind(
            this,
            {
                item0 : radopFirst,
                item1 : checkBoxFirst,
                item2 : checkBoxSecond,
                userId: userId,
                eventId: eventId
            }
        ))

        for (let k=0; k<checkBoxFirst.length; k++) {
            checkBoxFirst[k].addEventListener('change', changeEvent.bind(this, checkBoxFirst))
        }
        
        for (let j=0; j<checkBoxSecond.length; j++) {
            checkBoxSecond[j].addEventListener('change', changeEvent.bind(this, checkBoxSecond))
        }
    }
}

export default Home;
const Utils = { 
    parseRequestURL : () => { // hash return
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")

        let request = {
            resource : null,
        }
        request.resource = r[1]

        return request
    },
    /**
     * URL 파라미터를 반환한다.
     * 
     * @param {*} name paramater name 
     * @returns paramater
     */
    getParameterByName: (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
        const results = regex.exec(location.search)
    
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    /**
     * 데이터를 정렬한다.
     * 
     * @param {*} data pasing 할 데이터
     * @returns parsing data
     */
    resultDataParsing: (data) => {
        const keyValue = {}
        /**
        * item: {key} : [0, 1 ,2]
         * @param {*} item 
         */
        const keyValueSet = (item, userId) => {
            /**
             * @param {string} key  문항 key 값 {key}
             * @param {Object} list 문형의 결과값 ex: {0 : [0, 1, 3]}
             */
            const setKeyValue = (key, list, userId) => {
                const setLow = (lowKey, lowList) => {
                    const lowData = keyValue[lowKey] || {total: 0, selectUsers: {}} // { 0 : 1, 3: 1, 4: 1}
                    for (let j=0; j<lowList.length; j++) {
                        const value = lowList[j]
                        if (!lowData[value] && value !== null) {
                            lowData[value] = 1
                            lowData['total'] += 1
                            lowData['selectUsers'][value] = [userId]
                        } else if (lowData[value] && value !== null){
                            lowData[value] += 1
                            lowData['total'] += 1
                            lowData['selectUsers'][value].push(userId)
                        }
                    }
                    return lowData
                }
                
                keyValue[key] = setLow(key, list)
            }
            
            /**
             * item: {key} : [0, 1 ,2]
             * key: item key
             */
            for (const key in item) {
                setKeyValue(key, item[key], userId)
            }
        }

        /**
         * { 14: [], 16: []: 18: []}
         */
        for (let i=0; i<data.length; i++) {
            keyValueSet(data[i].value, data[i].user_id)
        }
        return keyValue
    },
    /**
     * 문항을 선택한 항목정보들을 반환
     * 
     * @param {*} dataItemList 문항 리스트 ex) [13-0, 14-1]
     * @param {*} param1 {payload : '설문 총 경과', parsingData: payload parsing 값}
     * @returns 
     */
    selectUlsersItem: (dataItemList, {payload, parsingData}) => {
        let values = []
        /**
         * dataItem 문항  ex) 13-0
         */
        const returnData = (dataItem) => {
            const selectItem = dataItem.split('-')
            const key = selectItem[0]
            const index = selectItem[1]

            // 문상을 선택한 우저들 목록 ex) [a,b,c,d]
            const selectUers = parsingData[key].selectUsers[index]
            const returnItems = []

            /**
             * 설문조사 결과에서 USER ID 가 선택한 항목 결과를 반환
             * 
             * @param {*} userId 문항을 선택한 USER ID
             * @returns datalist []
             */
            const userItemReturn = (userId) => {
                for (const p in payload) {
                    const item = payload[p]
                    if (item.user_id === userId) {
                        return item
                    }
                }
            }
    

            for (const u in selectUers) {
                returnItems.push(userItemReturn(selectUers[u]))
            }

            return returnItems
        }

        for (const key in dataItemList) {
            values = [...values, ...returnData(key)]
            // 중복 제거
            values = values.filter((item, index) => {
                return values.indexOf(item) === index
            })
        }
        
        return values
    }
}

export default Utils;
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
        const keyValueSet = (item) => {
            /**
             * @param {string} key  문항 key 값 {key}
             * @param {Object} list 문형의 결과값 ex: {0 : [0, 1, 3]}
             */
            const setKeyValue = (key, list) => {
                const setLow = (lowKey, lowList) => {
                    const lowData = keyValue[lowKey] || {total: 0} // { 0 : 1, 3: 1, 4: 1}
                    for (let j=0; j<lowList.length; j++) {
                        const value = lowList[j]
                        if (!lowData[value] && value !== null) {
                            lowData[value] = 1
                            lowData['total'] += 1
                        } else if (lowData[value] && value !== null){
                            lowData[value] += 1
                            lowData['total'] += 1
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
                setKeyValue(key, item[key])
            }
        }

        /**
         * { 14: [], 16: []: 18: []}
         */
        for (let i=0; i<data.length; i++) {
            keyValueSet(data[i].value)
        }
        return keyValue
    }
}

export default Utils;
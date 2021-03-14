let Error = {
    render : async () => {
        let view =  `
            <table class="errorPage">
                <tr>
                    <td class='errorPage__td'>
                        <h1> 이벤트가 존제하지 안거니<br/>오류가 발생하였습니다.</h1>
                    </td>
                </tr>
            </table>
        `
        return view
    },
    after_render: () => {

    }
}
export default Error
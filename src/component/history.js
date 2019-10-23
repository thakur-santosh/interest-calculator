import React from 'react'

function History(props) {
    // const lists = JSON.parse(localStorage.getItem('intrestList'))
    // console.log('historyList', lists)
    const h1 = {
        textAlign: "center",
        textTransform: "uppercase",
        color: "#4CAF50"
    }

    function handleClick(list){
        console.log(list)
        props.handleClick(list)
    }

    const lists = JSON.parse(localStorage.getItem('intrestList'))

    return (
        <div>
            <h1 style={h1}>History</h1>
                        <ul className="nav flex-column">
                            {
                                lists.map((list,index) => {
                                    console.log('list', list)
                                    return <li className="nav-item" key={index+1}>
                                        <button onClick ={() => { handleClick(list) }} className="btn btn-outline-secondary">Amount -{list.principal.amount}{' '}Month - {list.numPayments}</button>
                                    </li>
                                })
                            }
                        </ul>
        </div>
    )
}

export default History
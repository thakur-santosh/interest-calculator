import React from 'react'
import axios from '../config/axios'
import History from '../component/history'



export default class LoanCalculator extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: '500',
            months: '6',
            intrest: '',
            perMonth: '',
            list: []
        }
    }

    saveToLocal = (data) => {
        console.log('local', data)
        const saveLocal = {
            amount: data.principal.amount,
            month: data.numPayments,
            intrest: data.interestRate,
            amountPerMonth: data.monthlyPayment.amount
        }
        console.log('saveToLocal', saveLocal)
        this.state.list.push(data)
        localStorage.setItem('intrestList', JSON.stringify(this.state.list))

    }



    calculateLoad = () => {
        axios.get(`/interest?amount=${this.state.amount}&numMonths=${this.state.months}`)
            .then(response => {
                console.log(response.data)
                if (response.data) {
                    const pAmount = response.data.principal.amount
                    const month = response.data.numPayments
                    this.saveToLocal(response.data)
                    this.setState({
                        intrest: response.data.interestRate,
                        perMonth: response.data.monthlyPayment.amount
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChnage = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.calculateLoad()
        })
    }

    handleClick = (list) => {
        console.log(list)
        this.setState({
            amount: list.principal.amount,
            months: list.numPayments,
            intrest: list.interestRate,
            perMonth: list.monthlyPayment.amount
        })
    }



    render() {
        const h1 = {
            textAlign: "center",
            textTransform: "uppercase",
            color: "#4CAF50"
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3" style={{ "backgroundColor": "powderblue" }}>
                        {localStorage.getItem('intrestList') && (<History handleClick={this.handleClick} />)}
                    </div>
                    <div className="col-md-9">
                        <h3 className="alert alert-danger" role="alert">Interest Calculator</h3>
                        <label className="alert alert-warning">Amount</label>{' '}
                        <input type="range" name="amount" onChange={this.handleChnage} value={this.state.amount} min="500" max="5000" style={{ dataShowValue: "true" }} /><label className="alert alert-warning">${this.state.amount}</label><br /><br />
                        <label className="alert alert-warning">Month</label>{' '}
                        <input type="range" name="months" onChange={this.handleChnage} value={this.state.months} min="6" max="24" /><label className="alert alert-warning">{this.state.months}</label><br /><br />
                        <label className="alert alert-success">Intrest {' - '} {this.state.intrest}</label><br />
                        <label className="alert alert-success">amount perMonth {' - '} ${this.state.perMonth}</label>
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}


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
    // save the api data to local storage
    saveToLocal = (data) => {
        this.state.list.push(data)
        localStorage.setItem('intrestList', JSON.stringify(this.state.list))

    }

    calculateLoad = () => {
        axios.get(`/interest?amount=${this.state.amount}&numMonths=${this.state.months}`)
            .then(response => {
                if (response.data) {
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
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.calculateLoad()
        })
    }
    // passing the method to child as a props
    handleClick = (list) => {
        this.setState({
            amount: list.principal.amount,
            months: list.numPayments,
            intrest: list.interestRate,
            perMonth: list.monthlyPayment.amount
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3" style={{ "backgroundColor": "powderblue" }}>
                        {localStorage.getItem('intrestList') && (<History handleClick={this.handleClick} />)}
                    </div>
                    <div className="col-md-9">
                        <h3 className="alert alert-danger" role="alert">Interest Calculator</h3>
                        <label className="alert alert-warning">Amount</label>500{' '}
                        <input type="range" name="amount" onChange={this.handleChnage} value={this.state.amount} min="500" max="5000" style={{ dataShowValue: "true" }} />5000<label className="alert alert-warning">${this.state.amount}</label><br /><br />
                        <label className="alert alert-warning">Month</label>6{' '}
                        <input type="range" name="months" onChange={this.handleChnage} value={this.state.months} min="6" max="24" />24<label className="alert alert-warning">{this.state.months}</label><br /><br />
                        <label className="alert alert-success">Intrest {' - '} {this.state.intrest}</label><br />
                        <label className="alert alert-success">Amount per month {' - '} ${this.state.perMonth}</label>
                        <hr />
                        
                    </div>
                </div>
            </div>
        )
    }
}


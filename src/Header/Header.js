import React from "react";
import './Header.css';
import Hryvnia from "../Calculator/Hryvnia";
import Euro from "../Calculator/Euro";
import Dollar from "../Calculator/Dollar";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'date': '',
            'currencyRate': {},
            'currencyRateEuro': {},
            'currencyRateDollar': {}
        }
        this.currency = ['USD', 'EUR'];
        this.currencyEuro = ['UAH', 'USD'];
        this.currencyDollar = ['UAH', 'EUR'];
        this.getRate();
        this.getRateEuro();
        this.getRateDollar();
    }

    getRate = () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "g1KMMCX54XBKCRQDtvK6jDnK5kD1mnKz");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/exchangerates_data/latest?base=UAH", requestOptions)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({date: data.date});
                let result = {};
                for (let i = 0; i < this.currency.length; i++) {
                    result[this.currency[i]] = data.rates[this.currency[i]];
                }
                this.setState(({currencyRate: result}))
            })
    }

    getRateEuro = () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "g1KMMCX54XBKCRQDtvK6jDnK5kD1mnKz");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({date: data.date});
                let resultEuro = {};
                for (let i = 0; i < this.currency.length; i++) {
                    resultEuro[this.currencyEuro[i]] = data.rates[this.currencyEuro[i]];
                }
                this.setState(({currencyRateEuro: resultEuro}))
            })
    }

    getRateDollar = () => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "g1KMMCX54XBKCRQDtvK6jDnK5kD1mnKz");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions)
            .then(data => {
                return data.json();
            })
            .then(data => {
                this.setState({date: data.date});
                let resultDollar = {};
                for (let i = 0; i < this.currency.length; i++) {
                    resultDollar[this.currencyDollar[i]] = data.rates[this.currencyDollar[i]];
                }
                this.setState(({currencyRateDollar: resultDollar}))
            })
    }

    render() {

        return (
            <div className="wrapper">
                <header className="rate block">
                    <h3>Exchange rate on {this.state.date} against the hryvnia</h3>
                    <div className="flex-container">
                        {Object.keys(this.state.currencyRate).map((keyName, i) =>
                            (
                                <div className="block flex-item" key={keyName}>
                                    <div className="currency-name">{keyName}</div>
                                    <div className="currency-in">{(1/this.state.currencyRate[keyName]).toFixed(2)} UAH</div>
                                </div>
                            )
                        )}
                    </div>
                </header>
                <div className="block">
                    <div className="calculator">
                        <h3>Exchange calculator</h3>
                        <Hryvnia rate={this.state.currencyRate}/>
                        <Euro rate={this.state.currencyRateEuro}/>
                        <Dollar rate={this.state.currencyRateDollar}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;

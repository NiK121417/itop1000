import React from "react";
import styles from './Calculator.module.css';

class Dollar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0
        }
    }


    static getDerivedStateFromProps(props, state) {
        return {rate: props.rate};
    }

    calcRate = (e) => {
        e.preventDefault();
        let elements = e.target.elements;
        let countCurrency = elements['count-currency'].value;
        let typeCurrency = elements['type-currency'].value;
        this.setState({result: (countCurrency / this.state.rate[typeCurrency])})
    }

    render() {

        return (
            <div className={styles.currency__block}>
                <div>
                    <h3>Convert to dollars</h3>
                    <form onSubmit={this.calcRate}>
                        <input type="number" defaultValue="100" name="count-currency"/>
                        <select name="type-currency" id="">
                            {Object.keys(this.props.rate).map((keyName, i) =>
                                (
                                    <option key={keyName} value={keyName}>{keyName}</option>
                                )
                            )}
                        </select>
                        <button type="submit" defaultValue="calc">Convert</button>
                    </form>
                </div>
                <title className="result__block flex">
                    <h4>Result:</h4>
                    <span>USD {this.state.result.toFixed(2)}</span>
                </title>
            </div>
        );
    }
}

export default Dollar;

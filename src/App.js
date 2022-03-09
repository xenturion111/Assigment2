import React, { Component } from "react";

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

componentDidMount() {
  fetch('https://api.currencyfreaks.com/latest?apikey=b446c597873948a598d090cb7311241b')
    .then(res => res.json())
    .then(
      result => {
        this.setState({
          isLoaded: true,
          rates: result.rates
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
}

hasilCurrency = (curr, action) => {
  if(action === 0) {
    curr = (curr * 102) / 100;
  } else if (action === 1) {
    curr = (curr * 98) / 100;
  } else {
    // tidak melakukan apapun.
  }
let fixedCrr = curr.toFixed(4).toString();
  while (fixedCrr.length < 8) {
    fixedCrr = "0" + fixedCrr;
  }

  return fixedCrr;
};

membuatTable = () => {
  const rates = this.setState;
  let ratesArr = Object.keys(rates).map(i => rates[i])[2];
  let table = [];
  let children = [];
  let displayedCurrencies = ["CAD", "EUR", "IDR", "CHF", "JPY", "GBP"];
  for (let key in ratesArr) {
    if (ratesArr.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
      children.push(
        <tr>
          <td>{key}</td>
          <td>{this.hasilCurrency(ratesArr[key], 0)}</td>
          <td>{this.hasilCurrency(ratesArr[key])}</td>
          <td>{this.hasilCurrency(ratesArr[key], 1)}</td>
        </tr>
      );
    }
  }
  table.push(<tbody>{children}</tbody>);

  return table;
};
render() {
  const { error, isLoaded } = this.state;

  if (error) {
    return <div>Gagal: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <main>
        <div className="App-body">
          <table className="currencyTable">
            <thead>
              <tr>
                <th>CURRENCY</th>
                <th>WE BUY</th>
                <th>EXCHANGE RATE</th>
                <th>WE SELL</th>
              </tr>
            </thead>
            {this.membuatTable()}
          </table>
        </div>
      </main>
    );
  }
}
}



export default App;

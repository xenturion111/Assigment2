import React, { Component } from "react";
import "./App.css";

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
    fetch("https://api.currencyfreaks.com/latest?apikey=4a21026b3a8e4035868ea20ba8271aaf")
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

  perhitunganCrr = (crr, action) => {
    if (action === 0) {
      crr = (crr * 105) / 100;
    } else if (action === 1) {
      crr = (crr * 98) / 100;
    } else {
        //kosong
    }
    let fixedCrr = Number(crr).toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];
    let displayedCrr = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key) && displayedCrr.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.perhitunganCrr(ratesArr[key], 0)}</td>
            <td>{this.perhitunganCrr(ratesArr[key])}</td>
            <td>{this.perhitunganCrr(ratesArr[key], 1)}</td>
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
      return <div>Maaf Err: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
          <h1>Reza aditiya mustafa</h1>
            <table className="currencyTable">
              <thead>
                <tr>
                  <th>CURRENCY</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
          </div>
        </main>
      );
    }
  }
}
// function App() {
//   const [currencies, setCurrencies] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     setIsLoading(true);
//     fetch('https://api.currencyfreaks.com/latest?apikey=4a21026b3a8e4035868ea20ba8271aaf')
//       .then((res) => res.json())
//       .then((data) => {
//         setCurrencies(data.rates)
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setIsLoading(false))
//   }, [])
  

//   return (
//     <div className="App">
//       <h1>Menampilkan Currency</h1>
//       [{currencies}]
//     </div>
//   );
//   }


export default App;



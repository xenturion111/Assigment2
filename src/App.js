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

  const {currencies, setCurrencies} = this.useState({});
  useEffect(() => {

  })

  return (
    <div className="App">
        
    </div>
  );
    
 }

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
require('dotenv');

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  fetchPlayerData = () => {
    let dataGetter = response => {
      console.log(response);
      this.setState({ data: response })
    }
    let url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/DailyFantasyPoints/2017-SEP-10';
    return fetch(url, {
            method: "GET",
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.SECRET_KEY
            }
            })
            .then(response => response.json())
            .then(dataGetter)
            .catch(console.log("something didnt work..."))
  }

  componentDidMount = () => {
    this.fetchPlayerData();
  }

  render() {
    return (
      <div className="App">
        <h1>We did it!!!</h1>
        {this.state.data && this.state.data.map(player => {
          return (
          <div className="player-card">
            <h2>{player.Name}</h2>
              <div className="flex-cat">
                <h4>Fantasy Points:</h4>
                <p>{player.FantasyPoints}</p>
              </div>
              <div className="flex-cat">
                <h4>PPR FPs:</h4>
                <p>{player.FantasyPointsPPR}</p>
              </div>
              <div className="flex-cat">
                <h4>DraftKings FPs:</h4>
                <p>{player.FantasyPointsDraftKings}</p>
              </div>
              <div className="flex-cat">
                <h4>FanDuel FPs:</h4>
                <p>{player.FantsyPointsFanDuel}</p>
              </div>
          </div>
          )
        })}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import {Card, TextField} from "@material-ui/core";
import Countdown from "react-countdown-now";
import TheCrewButton from "./TheCrewButton";
import load from 'audio-loader';
import play from 'audio-play';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownStart: false,
      countdownReset: false,
      countdownTime: '',
      bigBlind: '',
      players: [''],
      showShuffledPlayers: false,
      isManualReset: false
    };

    this.handleCountdownComplete = this.handleCountdownComplete.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleBigBlindTextField = this.handleBigBlindTextField.bind(this);
    this.handleCountdownTimeTextField = this.handleCountdownTimeTextField.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.increasePlayerNumber = this.increasePlayerNumber.bind(this);
    this.showShuffledPlayers = this.showShuffledPlayers.bind(this);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  resetCountdown() {
    this.setState({countdownReset:false, countdownStart:true, bigBlind: this.state.bigBlind*2});
    if(!this.state.isManualReset) {
      load('reset-sound.mp3').then(play);
    }
  }

  handleCountdownComplete(isManualReset) {
    return () => this.setState({countdownStart: false, countdownReset:true, isManualReset});
  }

  handleStartClick() {
    this.setState({countdownStart: true, countdownTime: this.state.countdownTime*60*1000});
  }

  handleBigBlindTextField(event) {
    this.setState({bigBlind: event.target.value});
  }

  handleCountdownTimeTextField(event) {
    this.setState({countdownTime: event.target.value});
  }

  handleChangeField(playerNumber) {
    let players = this.state.players;
    return (event) => {
      players[playerNumber] = event.target.value;
      this.setState({players: players})
    };
  }

  increasePlayerNumber() {
    let players = this.state.players;
    players.push('');
    this.setState({players});
  }

  showShuffledPlayers() {
    const shuffledPlayers = this.shuffle(this.state.players);
    this.setState({showShuffledPlayers: true, players: shuffledPlayers});
  }

  render() {
    if(this.state.countdownReset) {
      this.resetCountdown();
    }

    return (
      <div className="App">
        <img style={{width: 200, marginBottom: 20}} src="the-crew.png" alt="Finner ikke bilde"/>
        <Card style={{padding: '5%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              {this.state.countdownStart && <h1><Countdown onComplete={this.handleCountdownComplete(false)} date={Date.now() + this.state.countdownTime} /></h1>}

              {!this.state.countdownStart && <TheCrewButton onClick={this.handleStartClick}>Start</TheCrewButton>}
            </div>
            {!this.state.countdownStart && <div style={{display: 'flex', justifyContent: 'center'}}>
               <TextField type="tel" onChange={this.handleBigBlindTextField} value={this.state.bigBlind} style={{width: '45%', maxWidth: 150, margin: 10}} label="Big Blind"/>
               <TextField type="tel" onChange={this.handleCountdownTimeTextField} value={this.state.countdownTime} style={{width: '45%', maxWidth: 150, margin: 10}} label="Nedtelling(min)"/>
            </div>}
            {this.state.countdownStart && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around', marginTop: 10}}>
              <h2>Big Blind: {this.state.bigBlind}</h2>
              <h3>Small Blind: {this.state.bigBlind/2}</h3>
            </div>}
            {!this.state.countdownStart && this.state.showShuffledPlayers && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around', marginTop: 10}}>
              {this.state.players.map((name, index) => index === 0 && this.state.players.length > 1 ? <h2 key={index}>Big {name}</h2> : index === 1 ? <h3 key={index}> Small {name}</h3> : <p key={index}>{name}</p>)}
            </div>}
            {!this.state.countdownStart && !this.state.showShuffledPlayers && <div style={{display: 'flex', flexDirection: 'column', width: '94%', maxWidth: 320}}>
              {this.state.players.map((name, index) => <TextField key={index} style={{marginTop: 10}} value={this.state.players[index]} autoFocus={index !== 0} onChange={this.handleChangeField(index)} label={`Spiller ${index+1}`}/>)}
              <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 20}}>
                <TheCrewButton onClick={this.increasePlayerNumber}>legg til</TheCrewButton>
                <TheCrewButton onClick={this.showShuffledPlayers}>stokk</TheCrewButton>
              </div>
            </div>}
            {this.state.countdownStart && <TheCrewButton onClick={this.handleCountdownComplete(true)}>Øk Blind</TheCrewButton>}
          </div>
        </Card>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import {Card, TextField} from "@material-ui/core";
import Countdown from "react-countdown-now";
import StartButton from "./StartButton";
import createPlayer from 'web-audio-player';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownStart: false,
      countdownReset: false,
      countdownTime: '',
      bigBlind: '',
      players: ['']
    };

    this.handleCountdownComplete = this.handleCountdownComplete.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleBigBlindTextField = this.handleBigBlindTextField.bind(this);
    this.handleCountdownTimeTextField = this.handleCountdownTimeTextField.bind(this);
  }

  resetCountdown() {
    this.setState({countdownReset:false, countdownStart:true, bigBlind: this.state.bigBlind*2});
    const audio = createPlayer('reset-sound.mp3');
    audio.play();
    audio.node.connect(audio.context.destination);
  }

  handleCountdownComplete() {
    this.setState({countdownStart: false, countdownReset:true});
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

  render() {
    if(this.state.countdownReset) {
      this.resetCountdown();
    }

    return (
      <div className="App">
        <img style={{width: 200, marginBottom: 20}} src="the-crew.png" alt="Finner ikke bilde"/>
        <Card style={{padding: '5%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around'}}>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              {this.state.countdownStart && <Countdown onComplete={this.handleCountdownComplete} date={Date.now() + this.state.countdownTime} />}

              {!this.state.countdownStart && <StartButton style={{width: 150}} onClick={this.handleStartClick}>Start</StartButton>}
            </div>
            {!this.state.countdownStart && <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
               <TextField type="tel" onChange={this.handleBigBlindTextField} value={this.state.bigBlind} style={{width: '45%', maxWidth: 150, margin: 10}} label="Big Blind"/>
               <TextField type="tel" onChange={this.handleCountdownTimeTextField} value={this.state.countdownTime} style={{width: '45%', maxWidth: 150, margin: 10}} label="Nedtelling(min)"/>
            </div>}
            {this.state.countdownStart && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'space-around', marginTop: 10}}>
              <h3>Big Blind: {this.state.bigBlind}</h3>
              <h4>Small Blind: {this.state.bigBlind/2}</h4>
            </div>}
          </div>
        </Card>
      </div>
    );
  }
}

export default App;

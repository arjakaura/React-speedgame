import React, { Component} from 'react';
import './App.css';
import Circle from './Circle/Circle.js';
import GameOver from './GameOver/GameOver.js';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// pitää laittaa +1, että arpoo myös nelosen, random arpoo aina
// yhden vähemmän (floor)


class App extends Component {
  state = {
    score:0,
    current:0,
    showGameOver: false
  };

  pace = 1500;
  timer = undefined;

  next = () => {

    let nextActive = undefined;

    do {
      nextActive = getRndInteger(1,4);
    } while (nextActive === this.state.current); //arpoo niin kauan kun numerot ovat samat

    this.setState({
      current:nextActive,
    });

    this.pace *= 0.95;
    this.timer = setTimeout(this.next.bind(this), this.pace);   //peli nopeutuu koko ajan

    console.log(this.state.current);
  }

  clickHandler = (btnId) =>{
    
    if (this.state.current !== btnId) {
    this.endHandler();
    return;
    }

    this.setState({          
        score: this.state.score + 1
    })
  }

  startHandler = () => {
    this.next();
  }

  endHandler = () => {
    clearTimeout(this.timer);

    this.setState({
      showGameOver: true
    })
  }

  render () {
  return (
    <div>
      <h1>Speedgame</h1>
      <p>Your score is: {this.state.score}</p>
        <Circle
          buttonColor ='green'
          active={this.state.current === 1}
          click={() => this.clickHandler(1)}
        />
        <Circle
          buttonColor ='yellow'
          active={this.state.current === 2}
          click={() => this.clickHandler(2)}
        />
        <Circle
          buttonColor ='blue'
          active={this.state.current === 3}
          click={() => this.clickHandler(3)}
         />
        <Circle
          buttonColor ='red'
          active={this.state.current === 4}
          click={() => this.clickHandler(4)}
          />

     
      <div>
        <button onClick={this.startHandler}>Start Game</button>
        <button onClick={this.endHandler}>End Game</button>
      </div>
        { this.state.showGameOver && <GameOver score={this.state.score}/>}

      </div>  

     
  );
}};



export default App;

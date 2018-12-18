import React, { Component } from 'react';
import Card from './components/Card';
import Wrapper from './components/Wrapper';
import Score from './components/Score';
import smash from './cards.json';
import './App.css';

export default class App extends Component {
  // Setting this.state.smash to the cards json array
  state = {
    smash,
    clickedSmashIds: [],
    score: 0,
    goal: 20,
    status: ""
  };

  //shuffle the smash cards in the browser when clicked 
  shuffleScoreCard = id => {
    let clickedSmashIds = this.state.clickedSmashIds;

    if (clickedSmashIds.includes(id)) {
      this.setState({ clickedSmashIds: [], score: 0, status: 'Game Over! Click to play again.' });
      return;
    } else {
      clickedSmashIds.push(id)

      if (clickedSmashIds.length === 20) {
        this.setState({ score: 20, status: 'You Super Smashed this match! Click to play again.', clickedSmashIds: [] });
        console.log('You Win');
        return;
      }

      this.setState({ smash, clickedSmashIds, score: clickedSmashIds.length, status: ' ' });

      for (let i = smash.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [smash[i], smash[j]] = [smash[j], smash[i]];
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='App-title'>Clicky Smash</h1>
          <p className='App-intro'>
            DO NOT click on the same image twice to win!
          </p>
        </header>
        <Score total={this.state.score}
          goal={20}
          status={this.state.status}
          />
        <Wrapper>
          {this.state.smash.map(smash => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={smash.id}
              key={smash.id}
              image={smash.image}
            />
          ))}
        </Wrapper>
      </div>
      );
    }
  }


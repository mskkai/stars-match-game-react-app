import React, { useState } from 'react';
import './App.css';
import StarMatchGame from './star-game/Game'

function App() {
  const [startGame, setStartGame] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        {
          startGame ? <StarMatchGame></StarMatchGame> :
            <button className='game-done' onClick={() => setStartGame(true)}>Start Game</button>
        }
      </header>
    </div>
  );
}

export default App;

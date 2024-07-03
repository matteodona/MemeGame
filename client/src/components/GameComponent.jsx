import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import APIGame from '../api/api-game.mjs';
import { Game } from "../models/Game.mjs";

import { Round } from "./Round";

function GameComponent(props){
    const [memeIds, setMemeIds] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [nextRound, setNextRound] = useState(1);
    const [validRounds, setValidRounds] = useState([]);
    const navigate = useNavigate();

    const areRoundValids = (validRounds) => {
      return validRounds.every(round => round === true);
    }

    useEffect(() => {
        if (nextRound > 3 && areRoundValids(validRounds)) {
          const addGame = async () => {
            try {
              await APIGame.addGame(new Game(props.user.id, memeIds, rounds));
              props.setRefreshGames(true);
              navigate('/');
            } catch (error) {
              console.error('Failed to create meme instance:', error);
            }
          };
          addGame();
        }
        else if (nextRound > 3) {
          navigate('/');
        }
    }, [nextRound]);



 

    return (<div>
        {nextRound <= 3 && (
          <Round 
            key={nextRound} 
            nextRound={nextRound}
            setNextRound={setNextRound}
            loggedIn={true}
            memeIds={memeIds}
            setMemeIds={setMemeIds}
            rounds={rounds}
            setRounds={setRounds}
            setValidRounds={setValidRounds}
          />
        )}
      </div>
    );
}

export { GameComponent };

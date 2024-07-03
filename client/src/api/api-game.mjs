
const SERVER_URL = 'http://localhost:3001';
import { Game } from "../models/Game.mjs";

const getPlayedGames = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/playedGames`, {
      credentials: 'include',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch played games');
    }
    else if (response.ok) {
      const gamesJson = await response.json();
      return gamesJson.map(g => ({
        id: g.id, 
        userId: g.userId, 
        urls: g.urls,
        rounds: g.rounds
      }));
    } else {
      throw new Error('Internal server error');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};




async function addGame(game) {
  try {
    const response = await fetch(`${SERVER_URL}/api/game`, {  
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({userId: game.userId, memeIds: game.memeIds, rounds: game.rounds}),
      credentials: 'include'
    });

    if (!response.ok) {
      const errMessage = await response.json();
      throw new Error(errMessage.error || 'Unknown error'); 
    }

    return await response.json(); 
  } catch (error) {
    throw error;  
  }
}





const APIGame = { getPlayedGames, addGame };
export default APIGame;
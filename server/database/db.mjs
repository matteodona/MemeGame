import sqlite from 'sqlite3';

// open the database
export const db = new sqlite.Database('database/meme_game.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
} 
});
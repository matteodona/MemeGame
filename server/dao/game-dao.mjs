import { db } from "../database/db.mjs";



// Get random meme : return meme_id, url
export const getRandomMeme = () => {
  const memeId = Math.floor(Math.random() * 10) + 1;
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, url FROM memes WHERE id = ?`;
    db.get(sql, [memeId], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        resolve({error: "Meme not available, check the inserted id."});
      else {
        resolve({id: row.id, url: row.url});
      }
    });
  });   
}



// Get matched captions for the meme_id
export const getMatchedCaptions = (meme_id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, text FROM captions WHERE meme_id = ?`;
        db.all(sql, [meme_id], (err, rows) => {
        if (err)
            reject(err);
        else {
            const questions = rows.map(q => ({id: q.id, text: q.text})); 
            resolve(questions);
        }
        });
    });
}


// Get otherCaptions 
export const getCaptionById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id, text FROM captions WHERE id=?`;
        db.get(sql, [id], (err,row) => {
            if (err)
                reject(err);
              else if (row === undefined)
                resolve({error: "Caption not available, check the inserted id."});
              else {
                resolve({id: row.id, text: row.text});
              }   
        })
    })
}



export const getPlayedGames = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM games WHERE userId=?`;
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const games = rows.map((row) => {
          const meme_ids = [row.memeId1, row.memeId2, row.memeId3];
          const rounds = [row.round1, row.round2, row.round3];
          return { id: row.id, userId: row.userId, meme_ids: meme_ids, rounds: rounds };
        });
        resolve(games);
      }
    });
  });
}


export const getMemeById = (memeId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM memes WHERE id=?`;
    db.get(sql, [memeId], (err,row) => {
      if (err)
          reject(err);
        else if (row === undefined)
          resolve({error: "Meme not available, check the inserted id."});
        else {
          resolve({id: row.id, url: row.url});
        }   
    })
  })
}



// add new Game
export const addGame = (game) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT id from users WHERE id = ?';
    db.get(sql, [game.userId], (err, row) => {
      if (err)
        reject(err);  
      else if (row === undefined)
        resolve({error: "User not available, check the inserted id."});
      else {
        if (!game.memeIds || !game.rounds || game.memeIds.length !== 3 || game.rounds.length !== 3) {
          throw new Error('Invalid game data. Expected 3 memeIds and 3 rounds.');
          
        }
        sql = "INSERT INTO games(memeId1, memeId2, memeId3, round1, round2, round3, userId) VALUES (?, ?, ?, ?, ?, ?, ?);"
        db.run(sql, [game.memeIds[0], game.memeIds[1], game.memeIds[2], game.rounds[0], game.rounds[1], game.rounds[2], game.userId], function (err) {
          if (err) {
            reject(err);
          } else {
            game.id = this.lastID;
            resolve(game);
          }
        });
      }
    });
  });
}






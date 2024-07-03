import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import { getRandomMeme, getMatchedCaptions, getCaptionById, getPlayedGames, addGame, getMemeById } from "./dao/game-dao.mjs";
import { getUser, getUserById } from "./dao/user-dao.mjs";
import { Meme } from "./models/Meme.mjs";

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));

// CORS 
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// Passport setup
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


// **************** API AUTHENTICATION ******************
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});


app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// **************** API GAME ******************
app.get('/api/singleRound', async (req, res) => {
  try {
    const meme = await getRandomMeme();
    if (!meme.id) {
      res.status(404).json({ error: "Meme not found" });
      return;
    }

    const matchedCaptions = await getMatchedCaptions(meme.id);
    if (matchedCaptions.error) {
      res.status(404).json(matchedCaptions);
      return;
    }

    let allIds = Array.from({ length: 51 }, (_, i) => i + 1);
    const matchedIds = matchedCaptions.map(caption => caption.id);
    const otherIds = allIds.filter(id => !matchedIds.includes(id));
    const selectedIds = otherIds.sort(() => Math.random() - 0.5).slice(0, (7 - matchedIds.length));

    const otherCaptions = await Promise.all(selectedIds.map(id => getCaptionById(id)));

    const resultMeme = new Meme(meme.id, meme.url, matchedCaptions, otherCaptions);

    res.json(resultMeme);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.get('/api/playedGames', isLoggedIn, async (req, res) => {
  const userId = req.user.id;
  

  try {
    const games = await getPlayedGames(userId);

    if (!Array.isArray(games)) {
      return res.status(500).json({ error: 'Failed to retrieve games' });
    }

    const gamesWithMemeUrls = await Promise.all(games.map(async (game) => {
      const memeUrls = await Promise.all(game.meme_ids.map(async (memeId) => {
        const meme = await getMemeById(memeId);
        return meme.url;
      }));

      return {
        id: game.id,
        userId: req.user.id,
        urls: memeUrls,
        rounds: game.rounds
      };
    }));

    res.status(200).json(gamesWithMemeUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/game', isLoggedIn, async (req, res) => {
  try {
    const game = req.body;
   // console.log("Game data:", game);
    const result = await addGame(game);
    if (result.error) {
      res.status(400).json({ error: result.error });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

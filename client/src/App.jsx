import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Container, Row, Alert } from 'react-bootstrap';

import { Header } from './components/Header';
import { LoginForm } from './components/Authentication';
import { Round } from './components/Round';
import { NotFound } from './components/NotFoundComponent';
import { HomePage } from './components/HomePage';
import { GameComponent } from './components/GameComponent';

import APIGame from './api/api-game.mjs';
import APIUser from './api/api-user.mjs';


function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [message, setMessage] = useState(''); 
  const [user, setUser] = useState(''); 
  const [games, setGames] = useState([]);
  const [refreshGames, setRefreshGames] = useState(false); // flag used to refresh games after a game is added

  const fetchPlayedGames = async () => {
      try {
        const userId = user.id;
        const games = await APIGame.getPlayedGames(userId);
        setGames(games);
      } catch (error) {
        console.error("Failed to fetch played games:", error);
      }
  };



  useEffect(() => {
      if (loggedIn){ // without this check a "401 unauthorized error" appears for anonimous users
        fetchPlayedGames(); 
        setRefreshGames(false); // Flag reset after fetching played games
      }   
  }, [loggedIn, refreshGames]);




  const handleLogin = async (credentials) => {
    try {
      const user = await APIUser.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
      setUser(user);
    } catch (err) {
      setMessage({ msg: err.message, type: 'danger' });
    }
  };

  const handleLogout = async () => {
    await APIUser.logOut();
    setLoggedIn(false);
    setMessage('');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <Header loggedIn={loggedIn} handleLogout={handleLogout} />
            <Container fluid className='mt-3'>
              {message && (
                <Row>
                  <Alert variant={message.type} onClose={() => setMessage('')} dismissible>
                    {message.msg}
                  </Alert>
                </Row>
              )}
              <Outlet />
            </Container>
          </>
        }>
          <Route index element={<HomePage loggedIn={loggedIn} games={games} />} />
          <Route path='/newRound' element={<Round loggedIn={loggedIn} />} />
          <Route path='/newGame' element={loggedIn ? <GameComponent user={user} setRefreshGames={setRefreshGames}/> : <Navigate replace to='/newRound' />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APISingleRound from '../api/api-singleRound.mjs';
import { Timer, ImageDisplay, CaptionButtons, ModalComponent } from './RoundComponents';
import './Round.css'; 

const Round = (props) => {
  const [selectedCaption, setSelectedCaption] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [correctCaptions, setCorrectCaptions] = useState([]);
  const [matchingCaptions, setMatchingCaptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const navigate = useNavigate();
  const didFetchMeme = useRef(false); 

  const fetchMeme = async () => {
    try {
      let memeData = await APISingleRound.getRandomMeme();
      if (props.loggedIn) {
        while (props.memeIds.includes(memeData.id)) {
          memeData = await APISingleRound.getRandomMeme();
        }
      } 
      setImageUrl(`/${memeData.url}`);
      const allCaptions = [...memeData.matching, ...memeData.other];
      setCaptions(allCaptions.sort(() => Math.random() - 0.5));  
      setMatchingCaptions(memeData.matching);

      if (props.loggedIn) {
        props.setMemeIds((prevMemeIds) => [...prevMemeIds, memeData.id]);
      }
    } catch (error) {
      console.error('Failed to fetch meme:', error);
    }
  };

  useEffect(() => {
    if (!didFetchMeme.current) { 
      fetchMeme();
      didFetchMeme.current = true;
    }
  }, []); 

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) {
      handleTimeOver();
    }
  }, [timeLeft, timerActive]);

  const handleTimeOver = () => {
    
    setModalTitle("Time is over");
    setModalMessage("The best matching captions are:");
    setCorrectCaptions(matchingCaptions.map(c => c.text));
    

    if (props.loggedIn) {
      props.setRounds((prevRounds) => [...prevRounds, 0]);
      props.setValidRounds((prevRounds) => [...prevRounds, false]);
    }
    setShowModal(true);
  };  

  const handleCaptionClick = (caption) => {
    setSelectedCaption(caption);
    setTimerActive(false);  // Stop the timer
    const isMatching = matchingCaptions.some(c => c.id === caption.id);
    if (isMatching) {
      setModalTitle("Success");
      setModalMessage("Congratulations!! You get 5 points");
      setCorrectCaptions([]);

      if (props.loggedIn) {
        props.setRounds((prevRounds) => [...prevRounds, 5]);
        props.setValidRounds((prevRounds) => [...prevRounds, true]);
      }

    } else {
      setModalTitle("Wrong Caption");
      setModalMessage("The best matching captions are:");
      setCorrectCaptions(matchingCaptions.map(c => c.text));
      
      if (props.loggedIn) {
        props.setRounds((prevRounds) => [...prevRounds, 0]);
        props.setValidRounds((prevRounds) => [...prevRounds, true]);
      }
    }
    setShowModal(true);    
  };

  const handleCloseModal = () => {
    setShowModal(false)
    if (props.loggedIn) {
      props.setNextRound((prevRound) => prevRound + 1);
    };}

  const handleNewGame = async () => {   
    setShowModal(false);
    setSelectedCaption(null);
    setTimeLeft(30);
    setTimerActive(true); // Restart the timer for the new game
    if (props.loggedIn) {
      navigate('/');
    }

    didFetchMeme.current = false; // Resetta per la nuova partita
    await fetchMeme();
  };

  const handleBackToHome = () => navigate('/');

  return (
    <Container className="text-center mt-5">
      <Timer timeLeft={timeLeft} />
      <Row className="justify-content-center">
        <Col xs={12} className="mb-4">
          <h2 className="title">Choose the right caption</h2>
        </Col>
      </Row>
      <ImageDisplay imageUrl={imageUrl} />
      <CaptionButtons 
        captions={captions} 
        selectedCaption={selectedCaption} 
        handleCaptionClick={handleCaptionClick} 
      />
      <Row className="button-group">
        <Button variant="success" onClick={handleNewGame}>
          Start a new game
        </Button>
        <Button variant="secondary" onClick={handleBackToHome}>
          Back Home
        </Button>
      </Row>
      <ModalComponent 
        loggedIn={props.loggedIn}
        showModal={showModal} 
        handleCloseModal={handleCloseModal}
        modalTitle={modalTitle}
        modalMessage={modalMessage}
        correctCaptions={correctCaptions}
        handleNewGame={handleNewGame}
        handleBackToHome={handleBackToHome}
      />
    </Container>
  );
};

export { Round };

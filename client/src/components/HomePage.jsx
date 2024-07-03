import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Image, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';






function HomePage(props) {
  const { loggedIn, games } = props;

  return (
    <Container fluid className="text-center">
      <Row className={`my-5 ${!loggedIn ? 'mt-5' : ''}`}>
        <Col>
          <h1 className="display-4">Welcome to Meme Game</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          {loggedIn ? (
            <>
              <HistoryTable games={games} />
              <div className="mt-4">
                <NewGameButton loggedIn={loggedIn} />
              </div>
            </>
          ) : (
            <div className="mt-4 pt-5">
              <NewGameButton loggedIn={loggedIn} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function NewGameButton({ loggedIn }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (loggedIn) {
      navigate('/newGame');
    } else {
      navigate('/newRound');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
      <Button 
        onClick={handleClick} 
        style={{ backgroundColor: 'green', color: 'white', fontSize: '28px', padding: '15px 30px' }}
      >
        Start a new game
      </Button>
    </div>
  );
}



function HistoryTable({ games }) {
  const [sortedGames, setSortedGames] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const sorted = [...games].sort((a, b) => {
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    });
    setSortedGames(sorted);
  }, [games, sortOrder]);

  const totalScore = sortedGames.reduce((acc, game) => {
    return acc + game.rounds.reduce((roundAcc, score) => roundAcc + score, 0);
  }, 0);

  const handleSortButton = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            Game
            <Button onClick={handleSortButton} variant="link" style={{ border: 'none', padding: '5px', background: 'none' }}>
              {sortOrder === 'desc'
                ?
                  // desc order icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="black" className="bi bi-sort-numeric-up" viewBox="0 0 16 16">
                    <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                    <path fillRule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                    <path d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/>
                  </svg>
                :
                  // asc order icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fillRule="currentColor" className="bi bi-sort-numeric-up-alt" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98"/>
                    <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707z"/>
                  </svg>

                  }
            </Button>
          </th>
          <th>Round 1</th>
          <th>Round 2</th>
          <th>Round 3</th>
          <th>Game Score</th>
        </tr>
      </thead>
      <tbody>
        {sortedGames.map((game, index) => (
          <TableRow key={game.id} game={game} index={index} totalGames={sortedGames.length} sortOrder={sortOrder} />
        ))}
        <tr>
          <td colSpan="4" style={{ textAlign: 'right' }}><strong>Total Score</strong></td>
          <td style={{ textAlign: 'center' }}><strong>{totalScore}</strong></td>
        </tr>
      </tbody>
    </Table>
  );
}

function TableRow({ game, index, totalGames, sortOrder }) {
  const gameScore = game.rounds.reduce((acc, score) => acc + score, 0);

  const imageStyle = {
    width: '100px',
    height: '100px',
    marginBottom: '10px'
  };

  const cardStyle = {
    textAlign: 'center',
    marginBottom: '10px'
  };

  const centeredStyle = {
    textAlign: 'center',
    verticalAlign: 'middle'
  };

  // set the index displayed in games: start from the last if the order is desc, otherwise start from the first
  const displayIndex = sortOrder === 'asc' ? index + 1 : totalGames - index; 

  return (
    <tr>
      <td style={centeredStyle}>{displayIndex}</td>
      <td>
        <Card style={cardStyle}>
          <Card.Body>
            <Image src={game.urls[0]} alt="Meme" style={imageStyle} />
            <Card.Text><strong>{game.rounds[0]} points</strong></Card.Text>
          </Card.Body>
        </Card>
      </td>
      <td>
        <Card style={cardStyle}>
          <Card.Body>
            <Image src={game.urls[1]} alt="Meme" style={imageStyle} />
            <Card.Text><strong>{game.rounds[1]} points</strong></Card.Text>
          </Card.Body>
        </Card>
      </td>
      <td>
        <Card style={cardStyle}>
          <Card.Body>
            <Image src={game.urls[2]} alt="Meme" style={imageStyle} />
            <Card.Text><strong>{game.rounds[2]} points</strong></Card.Text>
          </Card.Body>
        </Card>
      </td>
      <td style={centeredStyle}>
        {gameScore}
      </td>
    </tr>
  );
}



export { HomePage };

import { Row, Col, Image, Button, Modal, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';  

const Timer = ({ timeLeft }) => (
  <Row className="justify-content-center mb-3">
    <Col xs={12} className="mb-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faClock} size="2x" className="mr-2" />
        <h4 className="mb-0 ml-2">Time left: {timeLeft} seconds</h4>
      </div>
    </Col>
  </Row>
);


const ImageDisplay = ({ imageUrl }) => (
    <Row className="justify-content-center">
      <Col xs={12} md={6} className="d-flex justify-content-center mb-4">
        <Image 
          src={imageUrl} 
          style={{ width: '350px', height: '300px' }} 
          rounded 
          fluid 
        />
      </Col>
    </Row>
  );


const CaptionButtons = ({ captions, selectedCaption, handleCaptionClick }) => (
  <Row className="justify-content-center">
    {captions.map((caption, index) => (
      <Col key={index} xs={12} md={4} className="mb-2">
        <Button
          variant={selectedCaption === caption ? 'primary' : 'outline-primary'}
          onClick={() => handleCaptionClick(caption)}
          className="w-100"
        >
          {caption.text}
        </Button>
      </Col>
    ))}
  </Row>
);


const ModalComponent = ({loggedIn, showModal, handleCloseModal, modalTitle, modalMessage, correctCaptions, handleNewGame, handleBackToHome }) => (
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {modalMessage}
      {correctCaptions.length > 0 && (
        <ListGroup className="mt-3">
          {correctCaptions.map((caption, index) => (
            <ListGroup.Item key={index}>
              {caption}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Modal.Body>
    <Modal.Footer>
      {loggedIn ? <Button variant="success" onClick={handleCloseModal}>
        Next Round
      </Button>  :
        <Button variant="success" onClick={handleNewGame}>
        Start a new game
      </Button>}
      
      <Button variant="secondary" onClick={handleBackToHome}>
        Back to Home
      </Button>
    </Modal.Footer>
  </Modal>
);
  


export { Timer, ImageDisplay, CaptionButtons, ModalComponent };
const SERVER_URL = 'http://localhost:3001';

const getRandomMeme = async () => {
    const response = await fetch(SERVER_URL + '/api/singleRound');
    if(response.ok) {
      const memeJson = await response.json();
      return memeJson;
    }
    else
      throw new Error('Internal server error');
}




const APISingleRound = { getRandomMeme };
export default APISingleRound;


const SERVER_URL = 'http://localhost:3001';


async function logIn(credentials) {
  const response = await fetch('http://localhost:3001/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials : "include"
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const user = await response.json();
  return user;
}


const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  // an object with the error coming from the server
  }
};

async function logOut() {
  await fetch('http://localhost:3001/api/sessions/current', { method: 'DELETE' });
}



export default { logIn, logOut, getUserInfo };

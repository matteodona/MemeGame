// Import the database connection from db.mjs
import {db} from './db.mjs';

// SQL query for inserting data
const sql = `INSERT INTO memes (url) VALUES (?)`;

// Array of memes to be inserted
const memes = [
    {url : 'button.jpeg'},
    {url : 'dog.jpeg'},
    {url : 'kid.jpeg'},
    {url : 'old_man.jpeg'},
    {url : 'rana.jpeg'},
    {url : 'salt-bae.jpeg'},
    {url : 'singer.jpeg'},
    {url : 'toy_story.jpeg'},
    {url : 'winnie.jpeg'},
    {url : 'yao.jpeg'},
];

// Function to insert a single meme
function insertMeme(meme) {
    db.run(sql, [meme.url], (err) => {
        if (err) {
            console.error('Error executing SQL', err.message);
        } else {
            console.log(`A new row has been added: ${meme.url} - ${meme.caption}`);
        }
    });
}

// Iterate over the array of memes and insert each
memes.forEach(meme => insertMeme(meme));

// Close the database connection after all operations are done
// Use setTimeout to delay closing to ensure all inserts complete
setTimeout(() => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
}, 1000); // Adjust the timeout as necessary based on the number of entries



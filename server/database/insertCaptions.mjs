// Import the database connection from db.mjs
import {db} from './db.mjs';

// SQL query for inserting data
const sql = `INSERT INTO captions (id, text, meme_id) VALUES (?, ?, ?)`;

// Array of memes to be inserted
const captions = [
    { id: 1, text: 'When you finally get the pickle jar open on your own.', meme_id:  9},
    { id: 2, text: 'Me when I make a meme that gets 2 upvotes', meme_id:  9},
    { id: 3, text: 'When you finally remember your password on the first try.', meme_id:  5},
    { id: 4, text: 'When you finally remember your password on the first try.', meme_id:  5},
    { id: 5, text: "Monday morning emails, but you're already retired!", meme_id:  5},
    { id: 6, text: "Bad drivers, bad drivers everywhere", meme_id:  4},
    { id: 7, text: "Boom, proteins everywhere", meme_id:  4},
    { id: 8, text: "When you're a frog but also a gentleman of the 18th century.", meme_id:  10},
    { id: 9, text: "Mood: regally amphibious.", meme_id:  10},
    { id: 10, text: "Me avoiding responsibilities like...", meme_id:  1},
    { id: 11, text: "When someone says there's cake in the break room but you're on a diet.", meme_id:  1},
    { id: 12, text: "When you hear someone say 'treat' from three rooms away.", meme_id:  2},
    { id: 13, text: "That face you make when someone asks if you did something you definitely did.", meme_id:  2},
    { id: 14, text: "When you spot your best friend at a concert and try to make your way through the crowd.", meme_id:  3},
    { id: 15, text: "That moment you realize you're a queen and the stage is your castle.", meme_id:  3},
    { id: 16, text: "When you see your friend trip over nothing.", meme_id:  6},
    { id: 17, text: "That moment when you remember a joke from three days ago.", meme_id:  6},
    { id: 18, text: "Adding a little extra flair to my daily routine.", meme_id:  7},
    { id: 19, text: "When you're the main ingredient in every recipe.", meme_id:  7},
    { id: 20, text: "Before coffee vs. after coffee.", meme_id:  8},
    { id: 21, text: "Me during the week vs. me on the weekend.", meme_id:  8},
    { id: 22, text: "When your mom says 'we need to talk.'", meme_id:  null},
    { id: 23, text: "Trying to look busy when the boss walks by.", meme_id:  null},
    { id: 24, text : "When you find money in your old jeans.", meme_id : null},
    { id: 25, text : "Me every Monday vs. me every Friday.", meme_id : null},
    { id: 26, text : "When someone asks if you’re hungry and you just ate.", meme_id : null},
    { id: 27, text : "That face you make when your favorite song comes on.", meme_id : null},
    { id: 28, text : "When the Wi-Fi finally connects.", meme_id : null},
    { id: 29, text : "Me trying to explain a meme to my parents.", meme_id : null},
    { id: 30, text : "When you finish all your work and realize it's only Tuesday.", meme_id : null},
    { id: 31, text : "When your friend tags you in a ten-year-old photo.", meme_id : null},
    { id: 32, text : "That moment you hear a weird noise when home alone.", meme_id : null},
    { id: 33, text : "When you drop your phone but it lands on the carpet.", meme_id : null},
    { id: 34, text : "The look when someone uses your favorite mug.", meme_id : null},
    { id: 35, text : "Trying to leave a party without saying goodbye.", meme_id : null},
    { id: 36, text : "When you hear someone mention your favorite food.", meme_id : null},
    { id: 37, text : "Me: *says something* Siri: 'Sorry, I didn’t catch that.'", meme_id : null},
    { id: 38, text : "When your alarm goes off and you can’t remember what year it is.", meme_id : null},
    { id: 39, text : "When you try to pour without spilling and succeed.", meme_id : null},
    { id: 40, text : "That mini heart attack when you miss a step.", meme_id : null},
    { id: 41, text : "When your pet sits on your lap and you can’t move for hours.", meme_id : null},
    { id: 42, text : "When you find a matching lid to your Tupperware.", meme_id : null},
    { id: 43, text : "When your crush says hi and you say 'good, you?'", meme_id : null},
    { id: 44, text : "When you finally remember why you walked into the room.", meme_id : null},
    { id: 45, text : "That look when someone says 'it’s just a game.'", meme_id : null},
    { id: 46, text : "When you accidentally open the front camera.", meme_id : null},
    { id: 47, text : "When you’re about to sneeze and it disappears.", meme_id : null},
    { id: 48, text : "Trying to figure out how to fit another snack in the fridge.", meme_id : null},
    { id: 49, text : "When the GPS says 'you have arrived' but you haven’t.", meme_id : null},
    { id: 50, text : "When you open a pack of gum and everyone becomes your friend.", meme_id : null},
    { id: 51, text : "Trying not to laugh at a serious moment.", meme_id : null}
    
    
    
    
    
    
];

// Function to insert a single meme
function insertCaption(caption) {
    db.run(sql, [caption.id, caption.text, caption.meme_id], (err) => {
        if (err) {
            console.error('Error executing SQL', err.message);
        } else {
            console.log(`A new row has been added: ${caption.id}`);
        }
    });
}

// Iterate over the array of memes and insert each
captions.forEach(caption => insertCaption(caption));

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



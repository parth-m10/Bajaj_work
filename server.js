const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "Parth Jariwala";  
    const email = "parth10.jariwala@gmail.com";  
    const roll_number = "21BAI1276"; 

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highest_lowercase_alphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

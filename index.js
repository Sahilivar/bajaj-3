const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input: data must be an array" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        const highest_alphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

        res.json({
            is_success: true,
            user_id: config.USER_ID,
            email: config.EMAIL,
            roll_number: config.ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal server error" });
    }
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

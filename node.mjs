import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

app.get('/:playerName', async (req, res) => {
    const playerName = req.params.playerName.replace(/-/g, ' ');
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM collegebaseballplayer_unified WHERE name = ?',
            [playerName]
        );
        connection.end();

        if (rows.length === 0) {
            return res.status(404).send('Player not found');
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

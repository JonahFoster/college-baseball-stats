import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
// Top 10 Home Run Hitters
app.get('/top-hr', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `SELECT name, HR
             FROM collegebaseballplayer_unified
             WHERE data_type = 'batting'
             ORDER BY HR DESC
             LIMIT 10`
        );
        connection.end();

        if (rows.length === 0) {
            return res.status(404).send('No players found');
        }

        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Search for players route
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

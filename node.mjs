import express from 'express'
import path from 'path'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.static(path.join(__dirname, 'college-baseball-app', 'dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'college-baseball-app', 'dist', 'index.html'));
  });

const port = process.env.PORT || 3000

app.use(cors())

const dbConfig = process.env.DB_CONNECTION;

const CURRENT_SEASON = '2023'


// Top 10 Home Run Hitters
app.get('/top-hr', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, HR
             FROM collegebaseballplayer_unified
             WHERE data_type = 'batting' AND season = ?
             ORDER BY HR DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        );
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 Batting Average
app.get('/top-ba', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, ROUND((CAST(H AS DECIMAL) / NULLIF(AB, 0)), 3) AS batting_average
             FROM collegebaseballplayer_unified
             WHERE data_type = 'batting' AND AB > 100 AND season = ?
             ORDER BY batting_average DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 OPS
app.get('/top-ops', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq,
                ROUND(
                    ((CAST(H AS DECIMAL) + BB + HBP) / NULLIF(AB + BB + HBP + SF, 0)) +
                    ((CAST((H - 2B - 3B - HR) + (2 * 2B) + (3 * 3B) + (4 * HR) AS DECIMAL) / NULLIF(AB, 0))
                ), 3) AS OPS
             FROM collegebaseballplayer_unified
             WHERE data_type = 'batting' AND AB > 100 AND season = ?
             ORDER BY OPS DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 Walks
app.get('/top-bb', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, BB AS walks
             FROM collegebaseballplayer_unified
             WHERE data_type = 'batting' AND season = ?
             ORDER BY walks DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 ERA
app.get('/top-era', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, ERA, stats_player_seq
             FROM collegebaseballplayer_unified
             WHERE data_type = 'pitching' AND IP > 100 AND season = ?
             ORDER BY ERA ASC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})


// Top 10 K
app.get('/top-k', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, SO AS strikeouts
             FROM collegebaseballplayer_unified
             WHERE data_type = 'pitching' AND season = ?
             ORDER BY strikeouts DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 K%
app.get('/top-kp', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, ROUND((CAST(SO AS DECIMAL) / NULLIF(BF, 0)) * 100, 2) AS strikeout_percentage
             FROM collegebaseballplayer_unified
             WHERE data_type = 'pitching' AND BF > 100 AND season = ?
             ORDER BY strikeout_percentage DESC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

// Top 10 BA Against
app.get('/top-baa', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            `SELECT name, stats_player_seq, ROUND((CAST(H AS DECIMAL) / NULLIF(BF, 0)), 3) AS batting_average_against
             FROM collegebaseballplayer_unified
             WHERE data_type = 'pitching' AND BF > 100 AND season = ?
             ORDER BY batting_average_against ASC
             LIMIT 10`,
             [CURRENT_SEASON]
        )
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('No players found')
        }

        console.log(rows)
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})


// Search for players route
app.get('/search/:playerName', async (req, res) => {
    const playerName = req.params.playerName.replace(/-/g, ' ')
    try {
        const connection = await mysql.createConnection(dbConfig)
        const [rows] = await connection.execute(
            'SELECT * FROM collegebaseballplayer_unified WHERE name = ?',
            [playerName]
        ) 
        connection.end()

        if (rows.length === 0) {
            return res.status(404).send('Player not found')
        }

        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
})

app.get('/player/:playerId', async (req, res) => {
    const playerId = req.params.playerId;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM collegebaseballplayer_unified WHERE stats_player_seq = ?',
            [playerId]
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

app.get('/team/:school_name', async (req, res) => {
    const schoolName = req.params.school_name;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            'SELECT * FROM collegebaseballplayer_unified WHERE school_name = ?',
            [schoolName]
        );
        connection.end();

        if (rows.length === 0) {
            return res.status(404).send('No players found for this team in the current season');
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

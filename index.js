const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 40508;

app.use(cors());
app.use(express.json());

// --- RUTA 1: NASA (APOD) ---
app.get('/api/nasa', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la NASA' });
    }
});

// --- RUTA 2: FÚTBOL (Resultados recientes) ---
app.get('/api/futbol', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/matches', {
            headers: { 'X-Auth-Token': process.env.FOOTBALL_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la API de Fútbol' });
    }
});

// --- RUTA 3: INEGI (Población Total) ---
app.get('/api/inegi', async (req, res) => {
    try {
        // Ejemplo: Indicador de población total nacional
        const url = `https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/00/true/BISE/2.0/${process.env.INEGI_TOKEN}?type=json`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con el INEGI' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
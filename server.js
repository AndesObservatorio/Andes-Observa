const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configuración CORS más robusta
const corsOptions = {
    origin: '*', // Permite todas las solicitudes (para pruebas)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Manejar explícitamente las solicitudes OPTIONS (preflight)
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Andes Observa Studio funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/weather', async (req, res) => {
    try {
        const { city, country } = req.query;
        const API_KEY = process.env.OPENWEATHER_API_KEY;

        if (!API_KEY) {
            return res.status(500).json({ error: 'API Key no configurada en el servidor' });
        }

        // ✅ CORREGIDO: Usar template literals correctamente (con backticks `)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});


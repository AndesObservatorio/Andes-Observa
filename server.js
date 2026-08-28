const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());

// Único endpoint: health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Andes Observa Studio funcionando',
    timestamp: new Date().toISOString()
  });
});

// Endpoint simple para clima (simulado mientras arreglamos)
app.get('/api/weather', (req, res) => {
  res.json({ 
    city: req.query.city || 'Bogotá',
    temp: 18.5,
    humidity: 76,
    message: 'Datos de respaldo - Configurando API real'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});


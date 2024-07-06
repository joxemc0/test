const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/task');
const app = express();
const path = require('path');

const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);



app.use('/auth', authRoutes);
app.use(cors());
// Configurar la carpeta pública para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el enrutamiento de Vue.js
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

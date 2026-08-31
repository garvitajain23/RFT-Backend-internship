require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('../../config/db');
const taskRoutes = require('./routes/task.routes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/health', (req, res) => res.json({ service: 'task-service', status: 'UP' }));

const PORT = process.env.TASK_SERVICE_PORT || 5002;
app.listen(PORT, () => console.log(`📋 Task Service running on port ${PORT}`));
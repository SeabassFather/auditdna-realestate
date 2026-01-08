const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory
const fs = require('fs');
if (!fs.existsSync('./uploads/properties')) {
  fs.mkdirSync('./uploads/properties', { recursive: true });
}

// Routes
const propertyRoutes = require('./routes/properties');
const agentRoutes = require('./routes/agents');
const leadRoutes = require('./routes/leads');

app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/leads', leadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'AuditDNA Backend Running',
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auditdna-realestate';

mongoose.connect(MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.log('⚠️  MongoDB not available, using in-memory mode');
  console.log('   Install MongoDB or use cloud database for production');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('  🚀 AuditDNA Backend Server Started!');
  console.log('═══════════════════════════════════════════');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Properties: http://localhost:${PORT}/api/properties`);
  console.log(`👤 Agents: http://localhost:${PORT}/api/agents`);
  console.log(`📞 Leads: http://localhost:${PORT}/api/leads`);
  console.log('═══════════════════════════════════════════');
  console.log('');
});

module.exports = app;
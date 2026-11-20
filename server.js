require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Freelance Marketplace API is running!' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/contracts', require('./routes/contractRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.status || 500;
    return res.status(status).json({ message: status === 500 ? 'Internal server error' : error.message });
});

const startServer = async () => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be configured');
    await connectDB();
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
};

if (require.main === module) {
    startServer().catch((error) => {
        console.error('Server startup failed:', error.message);
        process.exitCode = 1;
    });
}

module.exports = { app, startServer };

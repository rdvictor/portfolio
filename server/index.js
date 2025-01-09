import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
let client;

async function connectToDb() {
  try {
    client = await MongoClient.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

app.post('/api/track', async (req, res) => {
  try {
    const collection = client.db().collection('visits');
    const visit = {
      timestamp: new Date(),
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      // Add more tracking data as needed
    };
    
    await collection.insertOne(visit);
    res.status(200).json({ message: 'Visit tracked' });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;

connectToDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
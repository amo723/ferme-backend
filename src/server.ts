import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from "mongoose";

import { PatientModel as Patient } from "./models/Patient";
import { port, dbURI, CORS_ALLOW_HOSTS, KEY_PATH, CERT_PATH } from "./config";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import Routes from "./routes";

const app = express();

// Enable CORS for all origins (customize as needed)
app.use(cors({
  origin: '*', // You can restrict this to your Android app’s URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parsing requests with JSON payloads
app.use(bodyParser.json());

// Add custom headers for Android requests
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Accept', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed for security
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  next();
});

// Define basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is working properly' });
});

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync(KEY_PATH),
  cert: fs.readFileSync(CERT_PATH)
};

mongoose
  .connect(dbURI, options)
  .then(() => {
    // only listen for requests once database data has loaded
    //app.listen(PORT, () => console.log(`Server has started at port ${PORT}`));
    https.createServer(httpsOptions, app).listen(port, () => {
        console.log(`Server running on https://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
  
  /*https.createServer(httpsOptions, app).listen(port, () => {
    console.log('Server running on https://localhost:443');
  });*/

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//Routes.register(app)


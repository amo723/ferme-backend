import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel as User } from "./models/User"
import { port, dbURI, TOKEN_KEY, CORS_ALLOW_HOSTS } from "./config";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

import Routes from "./routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// use bodyParser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

// connects to mongoDB database
// second parameter removes deprecation errors

const options: ConnectOptions = {};

mongoose
  .connect(dbURI, options)
  .then(() => {
    // only listen for requests once database data has loaded
    app.listen(port, () => console.log(`Server has started at port ${port}`));
  })
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


function verifyJWT(req: Request, res: Response) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
      if (err || !decoded) {
        return res.status(403).json({
          isLoggedIn: false,
          message: "Failed to Authenticate",
        });

      }
      res.json({
        uuid: (decoded as jwt.JwtPayload).uuid,
        username: (decoded as jwt.JwtPayload).username,
        display: (decoded as jwt.JwtPayload).display
      });

    });
  } else {

    res.status(403).json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}

Routes.register(app)

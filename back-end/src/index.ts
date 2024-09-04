import express, { Response, Request } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));

app.use("/api/users", userRoute), app.use("/api/auth", authRoute);
app.listen(7000, () => {
  console.log("Server running on 7000");
});

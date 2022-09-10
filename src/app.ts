import express from "express";
import router from "./routes/index";
import passport from "passport";

import "./middleware/passport.middleware";

const PORT = 5000;

const app = express();

app.use(passport.initialize());
app.use(express.json());
app.use("/api", router);


app.use('/api/meetup/',(req, res, next) => {
  console.log(req)
  next()
})

app.listen(PORT, () => console.log("started"));

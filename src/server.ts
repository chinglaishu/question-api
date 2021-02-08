import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import responseTime from "response-time";
import routes from "./route";
import UserQuery from "./query/userquery";
import IntervalJob from "./util/intervaljob";

const headerStrategy = require('passport-http-header-strategy').Strategy;
const LocalStrategy = passportLocal.Strategy;

passport.use('register', new LocalStrategy(
  { usernameField: "registerEmail", passwordField: "registerToken" },
  async (registerEmail, registerToken, done) => {
  const isValid = true;
  return done(null, isValid);
}));

passport.use('login', new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
  const user = await UserQuery.checkLogin(username, password);
  if (!user) {return done(null, false); }
  return done(null, user);
}));

passport.use('token', new headerStrategy({header: "token", passReqToCallback: true},
  async (req: any, request_origin: any, done: any) => {
    const access_token = (req.header("token") as string);
    const checkToken = UserQuery.verifyToken(access_token);
    if (!checkToken) {return done(null, false); }
    const user = (checkToken as any).data;
    return done(null, user);
  }
));

const app = express();
app.use(cors());
app.use((responseTime()));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(routes);

if (process.env.APP_ENV !== "test") {
  app.listen(3000);
  IntervalJob.checkDistribute();
  console.log("run server");
} else {
  app.enable('trust proxy');
}

export default app;

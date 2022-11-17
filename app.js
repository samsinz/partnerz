const express = require("express");
const hbs = require("hbs");

const app = express();

const session = require("express-session");
const MongoStore = require("connect-mongo");

require("./db");


app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.set("/views", __dirname + "views");
app.set("view engine", "hbs");

app.use(express.static("public"));

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.urlencoded({ extended: true }));

const index = require("./routes/index.routes");

const { exposeUserToView } = require("./middlewares/middlewares");

app.use(exposeUserToView);

app.use("/", index);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

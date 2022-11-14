const mongoose = require("mongoose");
require("dotenv/config");

const MONGO_URI = process.env.MONGO_URI;

console.log(`MONGO URI : ${MONGO_URI}`);

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: ${x.connections[0].name}`);
  })
  .catch((err) => console.log(`Error here ${err}`));

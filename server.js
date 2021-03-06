const express = require ("express");
const cors = require ("cors");
const mongoose = require ('mongoose');
const path = require("path")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri ,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open',() => {
    console.log(`MongoDB is up`);
});

const userRouter = require ('./routes/user');

app.use('/user', userRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }


app.listen(PORT,() => {
    console.log(`App listening on PORT ${PORT}`);
})
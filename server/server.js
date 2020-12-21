const Joi = require("joi");
const express = require("express");
const nedb = require("nedb");
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || 'data.db';
const db = new nedb({ filename: DB_PATH, autoload: true });
db.ensureIndex({ fieldName: 'netWPM' }, function (err) {
});

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

const corsOptions = {
  origin: process.env.HOMEPAGE,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const postSchema = Joi.object({
  name: Joi.string().pattern(new RegExp(/^[a-z\d\-_\s]+$/,'i'))
  .min(2).max(32).required(),
  netWPM: Joi.number().integer().required(),
  location: Joi.string().required(),
  mobile: Joi.boolean().required(),
  ip: Joi.string().required(),
});

app.listen(PORT, () => {
  console.log(`Network access via PORT: ${PORT}!`);
});


app.post("/api/scores", async (req, res, next) => {
  try {
    const { name, netWPM, location, mobile, ip } = req.body;

    const input = { name, netWPM, location, mobile, ip };

    await postSchema.validateAsync(input);
    const userScoreId = await asyncInsert(input);
    res.status(200).send({ message: userScoreId });
  } catch (err) {
    next(err);
  }
});

app.get("/api/scores/", async (req, res, next) => {
  try {
    const data = await asyncFind();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

function asyncInsert(input) {
  return new Promise(resolve => {
    db.insert(input, function (err, newDoc) {
      return resolve(newDoc._id);
    })
  })
}

function asyncFind() {
  return new Promise(resolve => {
    db.find({}).sort({ netWPM: -1 }).exec(function (err, docs) {
      docs.forEach(doc => delete doc.ip)
      return resolve(docs);
    });
  })
}
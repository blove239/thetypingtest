const Joi = require("joi");
const express = require("express");
const nedb = require("nedb-async").AsyncNedb;
const morgan = require("morgan");
const ip = require('ip');
const ipAddress = ip.address();
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || "data.db";
const pageSize = 10;
const db = new nedb({ filename: DB_PATH, autoload: true });
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(32).required(),
  netWPM: Joi.number().integer().required(),
  location: Joi.string().required(),
  mobile: Joi.boolean().required(),
  ip: Joi.string().required(),
});

app.listen(PORT, () => {
  console.log(`Network access via: ${ipAddress}:${PORT}!`);
});


app.post("/api/scores", async (req, res, next) => {
  let userScoreId;
  const setUserScoreId = (doc) => {
    return doc;
  }

  try {
    const { name, netWPM, location, mobile, ip } = req.body;

    const input = { name, netWPM, location, mobile, ip };

    await postSchema.validateAsync(input);
    await db.asyncInsert(input)
      .then(function (newDoc) {
        userScoreId = setUserScoreId(newDoc._id);
      })
      .catch(function (err) { })
    res.status(200).send({ message: userScoreId });
  } catch (err) {
    next(err);
  }
});


app.get("/api/scores/", async (req, res, next) => {
  try {
    const data = await db.asyncFind({});
    console.log(data);
    res.send(data);
    } catch (err) {
    next(err);
  }
});
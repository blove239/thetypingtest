const Joi = require("joi");
const express = require("express");
const nedb = require('nedb')
const morgan = require("morgan");
const cors = require('cors');
const ip = require('ip');
const ipAddress = ip.address();

const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || "data.db";
const pageSize = 10;
const db = new nedb({ filename: DB_PATH, autoload: true });
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const postSchema = Joi.object({
  name: Joi.string().alphanum().min(1).max(64).required(),
  netWPM: Joi.number().integer().required(),
  location: Joi.string().required(),
  mobile: Joi.boolean().required(),
  ip: Joi.string().required(),
});

app.listen(PORT, () => {
  console.log(`Network access via: ${ipAddress}:${PORT}!`);
});

app.post("/api/scores", async (req, res, next) => {
  try {
    const { name, netWPM, location, mobile, ip } = req.body;
    const input = { name, netWPM, location, mobile, ip };
    await postSchema.validateAsync(input);
    const data = await db.insert(input);
    res.status(200).send({ message: 'Your score has been submitted' });
    res.json(data);
  } catch (err) {
    next(err);
  }
});


app.get("/api/scores/:page", (req, res, next) => {
  const page = parseInt(req.params.page)
  try {
    let recordCount = 0;
    db.count({}, function (err, count) {
      recordCount = count;
    });
    db.find({}).sort({ netWPM: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec(function (err, docs) {
      docs.forEach(doc =>
        delete doc['ip'])
      console.log(docs)
      res.send([docs,recordCount])
    });
  } catch (err) {
    next(err);
  }
});
import express from "express";
import catsRouter from "./cats/cats.route";

const app = express();
const port = 8000;

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log(`this is logging middleware`);
  next();
});

//* JSON middleware
app.use(express.json());

app.use("/", catsRouter);

//* 404 middleware
app.use((req, res, next) => {
  console.log(`this is error middleware`);
  res.status(404).send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

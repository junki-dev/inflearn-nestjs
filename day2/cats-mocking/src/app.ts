import { Cat } from "./app.model";
import express, { Request, Response } from "express";

const app = express();
const port = 8000;

const data = [1, 2, 3, 4];

//* logging middleware
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log(`this is logging middleware`);
  next();
});

//* JSON middleware
app.use(express.json());

//* READ 고양이 전체 데이터 조회
app.get("/cats", (req, res) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error"); //! error example
    res.send({ sucess: true, data: { cats } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

//* READ 특정 고양이 데이터 조회
app.get("/cats/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cats = Cat;

    res.send({ sucess: true, data: { cats: cats.find((val) => val.id === id) } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

//* CREATE 새로운 고양이 추가
app.post("/cats", (req, res) => {
  try {
    const data = req.body;

    Cat.push(data);

    res.status(201).send({ sucess: true, data: { data } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

//* 404 middleware
app.use((req, res, next) => {
  console.log(`this is error middleware`);
  res.status(404).send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

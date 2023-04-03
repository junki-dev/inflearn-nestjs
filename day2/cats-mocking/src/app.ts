import { Cat } from "./app.model";
import express, { Request, Response } from "express";

const app = express();
const port = 8000;

const data = [1, 2, 3, 4];

app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log(`this is logging middleware`);
  next();
});

app.get("/cats/som", (req, res, next) => {
  console.log(`this is som middleware`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send({ cats: Cat });
});

app.get("/cats/blue", (req: Request, res: Response) => {
  res.send({ blue: Cat[0] });
});

app.get("/cats/som", (req: Request, res: Response) => {
  res.send({ som: Cat[1] });
});

app.use((req, res, next) => {
  console.log(`this is error middleware`);
  res.status(404).send({ error: "404 not found error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import { Router } from "express";
import { Cat } from "./cats.model";

const router = Router();

//* READ 고양이 전체 데이터 조회
router.get("/cats", (req, res) => {
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
router.get("/cats/:id", (req, res) => {
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
router.post("/cats", (req, res) => {
  try {
    const data = req.body;

    Cat.push(data);

    res.status(201).send({ sucess: true, data: { data } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

export default router;

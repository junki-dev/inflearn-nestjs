import { Request, Response } from "express";
import { Cat } from "./cats.model";

//* READ 고양이 전체 데이터 조회 -> GET
export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    // throw new Error("db connect error"); //! error example
    res.send({ sucess: true, data: { cats } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//* READ 특정 고양이 데이터 조회 -> GET
export const readCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cats = Cat;

    res.send({ sucess: true, data: { cats: cats.find((val) => val.id === id) } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//* CREATE 새로운 고양이 추가 -> POST
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;

    Cat.push(data);

    res.status(201).send({ sucess: true, data: { data } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = data;
        result = cat;
      }
    });

    res.send({ success: true, data: { cat: result } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    let result;
    Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...data };
        result = cat;
      }
    });

    res.send({ success: true, data: { cat: result } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newCat = Cat.filter((cat) => cat.id !== id);

    res.send({ success: true, data: { newCat } });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

import { Router } from "express";
import { StatusCodes } from "../constants/StatusCodes";

const router = Router();

router.get('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send();
});

export default router;
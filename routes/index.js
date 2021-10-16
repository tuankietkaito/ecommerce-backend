import express from "express";
import { functions } from "../services/user.service";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

//@desc Adding new user
//@route POST /adduser
router.post("/adduser", functions.addNew);

//@desc Authenticate a user
//@route POST /authenticate
router.post("/authenticate", functions.authenticate);

//@desc Get info on a user
//@route GET /getinfo
router.get("/getinfo", functions.getinfo);

import { User } from "../models/user.model";
import jwt from "jwt-simple";
import { SECRET_KEY } from "./../config/dbconfig";

export const functions = {
  addNew: function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newUser = User({
        username: req.body.username,
        password: req.body.password,
      });
      newUser.save(function (err, newUser) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  authenticate: function (req, res) {
    User.findOne(
      {
        username: req.body.username,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.status(403).send({ success: false, msg: "Authentication Failed, User not found" });
        } else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.encode(user, SECRET_KEY);
              res.json({ success: true, token: token });
            } else {
              return res.status(403).send({ success: false, msg: "Authentication failed, wrong password" });
            }
          });
        }
      }
    );
  },

  getinfo: function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      var token = req.headers.authorization.split(" ")[1];
      var decodedtoken = jwt.decode(token, SECRET_KEY);
      return res.json({ success: true, msg: "Hello " + decodedtoken.username + decodedtoken._id });
    } else {
      return res.json({ success: false, msg: "No Headers" });
    }
  },
};

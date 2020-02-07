const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");

  router.get("/signup", (req, res) => {
    res.render("signup", {
      js: ["signup"]
    });
  });

  router.post("/signup", (req, res, next) => {
    const user = req.body; // req.body contains the submited informations (out of post request)
  
    // if (req.file) user.avatar = req.file.secure_url;

    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      res.redirect("/signup");
      return;
    } else {
  
      userModel
        .findOne({
          email: user.email,
        })
        .then(dbRes => {
          if (dbRes) return res.redirect("/signup"); //
  
          const salt = bcrypt.genSaltSync(10); // https://en.wikipedia.org/wiki/Salt_(cryptography)
          const hashed = bcrypt.hashSync(user.password, salt); // generates a secured random hashed password
          user.password = hashed; // new user is ready for db
         
          userModel
            .create(user)
            .then(() => res.redirect("/signin"))

          // .catch(dbErr => console.log(dbErr));
        })
        .catch(next);
    }
  });

  router.get("/signin", (req, res) => {
    res.render("signin");
  });

  router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
      // one or more field is missing
      return res.redirect("/signin");
    }
  
    userModel
      .findOne({
        email: user.email
      })
      .then(dbRes => {
        if (!dbRes) {
          // no user found with this email
          return res.redirect("/signin");
        }
        // user has been found in DB !
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          // req.session.currentUser = user;
          // encryption says : password match succes
  
          const {
            _doc: clone
          } = {
            ...dbRes
          }; // make a clone of db user
  
  
          delete clone.password; // remove password from clone
          // // console.log(clone);
  
          req.session.currentUser = clone; // user is now in session... until session.destroy
          return res.redirect("/");
  
  
        } else {
          // encrypted password match failed
  
          return res.redirect("/signin");
        }
      })
      .catch(next);
  });

module.exports = router;

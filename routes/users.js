"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        // console.log('1', res.json(results));
        console.log('2', results)
        // console.log('3', res.json)
    });
  });

  return router;
}

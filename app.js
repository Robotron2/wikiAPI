const bodyParser = require("body-parser")
const ejs = require("ejs")
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
	console.log("Welcome to my wikipage")
})

app.listen(3000, function () {
	console.log("App is listening on port 3000")
})

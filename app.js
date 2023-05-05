const bodyParser = require("body-parser")
const ejs = require("ejs")
const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = new mongoose.Schema({
	title: String,
	content: String
})

const Article = mongoose.model("Article", articleSchema)

app.get("/articles", function (req, res) {
	Article.find({}).then((articles) => {
		if (articles.length !== 0) {
			res.send(articles)
		} else {
			res.send("There are no articles presently ")
		}
	})
})

app.listen(4000, function () {
	console.log("App is listening on port 4000")
})

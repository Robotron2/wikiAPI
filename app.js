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
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
})

const Article = mongoose.model("Article", articleSchema)

app.route("/articles")
	.get((req, res) => {
		Article.find({}).then((articles) => {
			if (articles.length !== 0) {
				res.send(articles)
			} else {
				res.send("There are no articles presently ")
			}
		})
	})
	.post((req, res) => {
		const title = req.body.title
		const content = req.body.content

		const newArticle = new Article({
			title,
			content
		})

		newArticle
			.save()
			.then(() => {
				// console.log("Successfully created an article!")
				res.send("Successfully created an article!")
			})
			.catch((err) => {
				// console.log(err)
				res.send("Error 400, Bad Request")
			})
	})
	.delete((req, res) => {
		Article.deleteMany({}).then((response) => {
			if (response.deletedCount !== 0) {
				res.send("Successfully deleted all documents.")
			} else {
				res.send("Something went wrong!")
			}
			// if (!err) {
			// } else {
			// 	console.log(err)
			// }
			// res.redirect("/articles")

			console.log(response)
		})
	})

app.listen(4000, function () {
	console.log("App is listening on port 4000")
})

// [
//     {
//         "_id": "6454eff1fc58d50af4ba0bd8",
//         "title": "REST",
//         "content": "REST is a short for REpresentational State Transfer. It's an architectural style for designing APIs."
//     },
//     {
//         "_id": "6454f0bdfc58d50af4ba0bd9",
//         "title": "API",
//         "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
//     },
//     {
//         "_id": "6454f0ddfc58d50af4ba0bda",
//         "title": "Bootstrap",
//         "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
//     },
//     {
//         "_id": "6454f0fcfc58d50af4ba0bdb",
//         "title": "DOM",
//         "content": "The Document Object Model is like an API for interacting with our HTML"
//     },
//     {
//         "_id": "6454f118fc58d50af4ba0bdc",
//         "title": "Jack Bauer",
//         "content": "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned."
//     },
//     {
//         "_id": "64550a2c2a61540e37862128",
//         "title": "Lorem Ipsum",
//         "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum autem modi esse, ratione accusantium vitae, natus fuga nostrum deleniti doloremque consectetur numquam eaque. Quod veniam porro magni sunt, similique ipsam.    ",
//         "__v": 0
//     },
//     {
//         "_id": "64550c5d71270b10682efd3d",
//         "title": "Lorem Ipsum",
//         "content": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum autem modi esse, ratione accusantium vitae, natus fuga nostrum deleniti doloremque consectetur numquam eaque. Quod veniam porro magni sunt, similique ipsam.    ",
//         "__v": 0
//     }
// ]

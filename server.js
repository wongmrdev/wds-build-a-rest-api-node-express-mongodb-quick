require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, 
	{ useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected To Database: recipes'))

app.use(express.json())

const recipesRouter = require('./routes/recipes')
app.use('/recipes', recipesRouter)
//'localhost:4000/recipes'
app.listen(process.env.PORT || 4000, () => console.log('server has started'))

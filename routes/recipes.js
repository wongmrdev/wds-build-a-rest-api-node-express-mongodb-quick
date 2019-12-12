//recipes
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const uuid = require('uuid')

// get all recipes
router.get('/', async (req, res) => {
	try {
		const recipes = await Recipe.find()
		res.json(recipes)
	} catch  (err) {
		res.status(500).json({ message: err.message})
	}
})
//get 1 recipe
router.get('/:id', getRecipe, (req, res) => {
	res.send(res.recipe.name)
})
//create a recipe
router.post('/', async (req, res) => {
	const recipe = new Recipe({
		name: req.body.name,
	    servings: req.body.servings,
	    cookTime: req.body.cookTime,
	    instructions: req.body.instructions,
	    ingredients: req.body.ingredients,
	    authors: req.body.authors,
	    created: req.body.created
	})

	try {
		const newRecipe = await recipe.save()
		console.log("successfully added recipe")
		console.log(recipe)
		res.status(201).json(newRecipe)

	} catch (err) {
		res.status(400).json({message: err.message})

	}

})
//update a recipe
router.patch('/:id', getRecipe, async (req, res) => {
	console.log("this is my updatedRecipe items: \n" + res.recipe)
	if (req.body.name != null) {
		res.recipe.name = req.body.name
	}
	if (req.body.servings != null) {
		res.recipe.servings = req.body.servings
	}
	try {
		const updatedRecipe = await res.recipe.save()
		res.json(updatedRecipe)
	} catch (error) {
		res.status(400).json({message: err.message})
	}
})
//delete a recipe
router.delete('/:id', getRecipe, async (req, res) => {
	try {
		await res.recipe.remove()
		res.json({message: 'Deleted Recipe'})

	} catch(err) { 
		res.status(500).json({message: err.message})
	}

})

async function getRecipe(req, res, next) {
	let recipe
	try {
		recipe = await Recipe.findById(req.params.id)
		console.log(req.params)
		if (recipe == null) {
			return res.status(404).json({messgae: "cannot find recipe"})
		}

	} catch (err) {
		return res.status(500).json({ message: err.message})
	}

	res.recipe = recipe
	console.log(recipe)
	next()
}

module.exports = router
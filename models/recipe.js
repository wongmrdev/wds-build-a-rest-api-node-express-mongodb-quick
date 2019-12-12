const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
	
    
    name: {type: String, required: true},
    servings: {type: Number, required: false},
    cookTime: {type: String, required: false},
    instructions: {type: String, required: false},
    ingredients: [
	    {
	    
	    name: {type: String, required: false},
	    amount: {type: String, required: false},
	 	}
	 	],
    authors: [
    	{
    		
    		name: {type: String, required: false}, 
    		email: {type: String, required: false}}],
    created: {type: Date, required: true, default: Date.now}
})

module.exports = mongoose.model('Recipe', recipeSchema)
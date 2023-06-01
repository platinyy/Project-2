const Recipe = require('../models/Recipe');

module.exports = {
    create
}

async function create(req, res){
    const recipe = await Recipe.findById(req.params.id);
    recipe.reviews.push(req.body);
    console.log(recipe)
    try{
        await recipe.save();
    }catch(err){
        console.log(err);
    }
    res.redirect(`/recipe/${recipe._id}`);
}
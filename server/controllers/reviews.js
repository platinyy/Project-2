const Recipe = require('../models/Recipe');

module.exports = {
    create,
    delete: deleteReview
}
async function deleteReview(req,res){
   //Review.findByIdAndDelete(req.params.id);
  const recipe = await Recipe.findOne({"reviews._id":req.params.id})
    const idx = recipe.reviews.findIndex(review => review._id.toString() === req.params.id)
    recipe.reviews.splice(idx, 1);
    recipe.save();
    res.redirect(`/recipe/${recipe._id}`);
   }


async function create(req, res){
    const recipe = await Recipe.findById(req.params.id);
    console.log(req.session)
    console.log(req.user, "user")
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    recipe.reviews.push(req.body);
    console.log(recipe)
    try{
        await recipe.save();
    }catch(err){
        console.log(err);
    }
    res.redirect(`/recipe/${recipe._id}`);
}
/*
function create(req, res) {
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar
  recipe.reviews.create(req.body)
  .then(recipe => {
    res.redirect("/recipe/${recipe._id}")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipe")
  })
}
*/
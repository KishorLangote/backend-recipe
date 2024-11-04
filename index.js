const { initializeDatabase } = require("./db/db.connect")
const Recipe = require("./models/recipe.models")
const { rmSync } = require("fs")
const express = require("express")
const { resolveSoa } = require("dns")
const app = express()

app.use(express.json()) // middleware

initializeDatabase() // this means calling the dababase..

// 1. Create a Mongoose model for a Recipe with the following attributes: this mongoose models are created in models file.

// 2. Create your db connection: db folder has been created..

// 3. Create an API with route "/recipes" to create a new recipe in the recipes database. Make sure to handle errors properly. Test your API with Postman. Add the following recipe:



const recipes = {

    title: "Spaghetti Carbonara",
    author: "Sanjeev Kapoor",
    difficulty: "Intermediate",
    prepTime: 20,
    cookTime: 15,
    ingredients: [
      "200g spaghetti",
      "100g guanciale or pancetta, diced",
      "2 large eggs",
      "50g grated Pecorino Romano cheese",
      "Salt and black pepper to taste"
    ],
    instructions: [
      "Cook the spaghetti in boiling salted water until al dente.",
      "Meanwhile, sauté the guanciale or pancetta until crispy.",
      "In a bowl, whisk together eggs and grated cheese.",
      "Drain the spaghetti and immediately toss with the egg mixture and cooked guanciale/pancetta.",
      "Season with salt and pepper. Serve immediately."
    ],
    imageUrl: "https://example.com/spaghetti_carbonara.jpg"

  }


  app.get("/", (req, res) => {
    res.send("Hello Express.")
})

// app.get("/recipes", (req,  res) => {
//     res.send(recipes)
// })


async function createNewRecipe(newRecipe){
    try {
        const recipe = new Recipe(newRecipe)
        const saveRecipe = await recipe.save()
        // console.log(saveRecipe)
        return saveRecipe
    } catch (error) {
        throw error
    }
}

// createNewRecipe(recipe)

// 4. Run your API and create another recipe data in the database.

// const newRecipe = {
//     title: "Chicken Tikka Masala",
//     author: "Sanjeev Kapoor",
//     difficulty: "Intermediate",
//     prepTime: 30,
//     cookTime: 30,
//     ingredients: [
//       "500g boneless, skinless chicken thighs, cut into bite-sized pieces",
//       "1 cup plain yogurt",
//       "2 tablespoons vegetable oil",
//       "2 onions, finely chopped",
//       "4 cloves garlic, minced",
//       "1-inch piece of ginger, grated",
//       "2 teaspoons ground coriander",
//       "1 teaspoon ground cumin",
//       "1 teaspoon paprika",
//       "1/2 teaspoon turmeric",
//       "1/2 teaspoon cayenne pepper (adjust to taste)",
//       "1 cup tomato puree",
//       "1 cup heavy cream",
//       "Salt and cilantro leaves for garnish"
//     ],
//     instructions: [
//       "Marinate chicken pieces in yogurt and spices for at least 1 hour.",
//       "Heat oil in a pan and sauté onions, garlic, and ginger until golden.",
//       "Add marinated chicken and cook until browned.",
//       "Stir in tomato puree and cook until chicken is cooked through.",
//       "Add cream, season with salt, and simmer for a few minutes.",
//       "Garnish with cilantro leaves and serve with rice or naan."
//     ],
//     imageUrl: "https://example.com/chicken_tikka_masala.jpg"
//   }

//   createNewRecipe(newRecipe)
 


// 5. Run your API and create another recipe data in the database

// const neRecipe = {
//     title: 'Classic Chocolate Chip Cookies',
//     author: 'Baker Betty',
//     difficulty: 'Easy',
//     prepTime: 15,
//     cookTime: 10,
//     ingredients: [
//       '1 cup (2 sticks) unsalted butter, softened',
//       '3/4 cup granulated sugar',
//       '3/4 cup packed light brown sugar',
//       '1 teaspoon vanilla extract',
//       '2 large eggs',
//       '2 1/4 cups all-purpose flour',
//       '1 teaspoon baking soda',
//       '1/2 teaspoon salt',
//       '2 cups semisweet chocolate chips'
//     ],
//     instructions: [
//       'Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.',
//       'In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.',
//       'Beat in the vanilla extract and eggs one at a time until well blended.',
//       'Combine the flour, baking soda, and salt; gradually stir into the creamed mixture.',
//       'Stir in the chocolate chips by hand using a wooden spoon.',
//       'Drop by rounded spoonfuls onto the prepared baking sheets.',
//       'Bake for 8 to 10 minutes in the preheated oven, or until edges are golden.',
//       'Allow cookies to cool on baking sheet for 5 minutes before transferring to a wire rack to cool completely.'
//     ],
//     imageUrl: 'https://example.com/classic_chocolate_chip_cookies.jpg'
//   }

//   createNewRecipe(neRecipe)

 // OR

 // write POST API means create a new rcipes data. And above newRecipe object send to the database via postman. And then save it in the database..

 app.post("/recipes", async (req, res) => {
    try {
        const savedRecipe = await createNewRecipe(req.body)
        res.status(201).json({message: "Recipe added successfully.", recipe: savedRecipe})
    } catch (error) {
        res.status(500).json({error: "Failed to add recipe."})
    }
 })

// 6. Create an API to get all the recipes in the database as a response. Make sure to handle errors properly.

// get the all recipes in the postnam database..

async function readAllRecipes(){
    try {
        const allRecipes = await Recipe.find()
        return allRecipes
        // console.log(allRecipes)
    } catch (error) {
     throw error
    }
}

// readAllRecipes()

 // get route to fetching all recipes..

app.get("/recipes", async (req, res) => {
    try {
        const recipes = await readAllRecipes()
        if(recipes.length > 0){
            res.json(recipes)
        } else {
            res.status(404).json({error: "No recipe found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

// 7. Create an API to get a recipe's details by its title. Make sure to handle errors properly.

// get recipe by title function: 

async function readRecipesByTitle(recipeTitle){
    try {
        const recipeByTitle = await Recipe.find({title: recipeTitle})
        return recipeByTitle
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipe."})
    }
}


  // get route to fetching all recipes by title: 

app.get("/recipes/:recipeTitle", async (req, res) => {
    try {
            const recipes = await readRecipesByTitle(req.params.recipeTitle)
            if(recipes.length > 0){
                res.json(recipes)
            } else {
                res.status(404).json({error: "No found recipe."})
            }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch reciepe data."})
    }
})

// 8. Create an API to get details of all the recipes by an author. Make sure to handle errors properly.

// get all recipes by author function :

async function readRecipeByAuthor(recipeAuthor){
    try {
        const recipeByAuthor = await Recipe.find({author: recipeAuthor})
        return recipeByAuthor
    } catch (error) {
        throw error
}
}

 // get route to fetching all recipes by author: 

app.get("/recipes/recipe/:recipeAuthor", async (req, res) => {
    try {
        const recipes = await readRecipeByAuthor(req.params.recipeAuthor)
        if(recipes.length > 0){
            res.json(recipes)
        } else {
            res.status(404).json({error: "No found recipes."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipes."})
    }
})

// 9. Create an API to get all the recipes that are of "Easy" difficulty level.

async function readAllRecipeByDiffLevel(){
    try {   
        const recipeByDiffLevel = await Recipe.find({difficulty: "Easy"})
        return recipeByDiffLevel
        // console.log(recipeByDiffLevel)
    } catch (error){
        throw error
    }
}

// readAllRecipeByDiffLevel()

// get routre recipe by easy difficulty level: 

app.get("/recipes/Level/:easy", async (req, res) => {
    try {
        const recipe = await readAllRecipeByDiffLevel(req.params.easy)
        if(recipe.length > 0){
            res.json(recipe)
        } else {
            res.status(404).json({error: "No found recipe."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch recipe data."})
    }
})

// 10. Create an API to update a recipe's difficulty level with the help of its id. Update the difficulty of "Spaghetti Carbonara" from "Intermediate" to "Easy". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.


async function updateData(recipeId, dataToUpdate){
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return updatedRecipe
    } catch (error) {
        throw error
    }
}


// get post route to update data in the database by id via postmna :

app.post("/recipes/directory/:recipeId", async (req, res) => {
    try {
        const updatedRecipe = await updateData(req.params.recipeId, req.body)
        if(updatedRecipe){
            res.status(200).json({message: "Recipe updated successfully.", recipe: updatedRecipe})
        } else {
            res.status(404).json({error: "Recipe not found."})
        }
    } catch (error) { 
        res.status(500).json({error: "Failed to update recipe data."})
    }
})

// 11. Create an API to update a recipe's prep time and cook time with the help of its title. Update the details of the recipe "Chicken Tikka Masala". Send an error message "Recipe not found" if the recipe is not found. Make sure to handle errors properly.

// Updated recipe data: { "prepTime": 40, "cookTime": 45 }

async function updateRecipe(recipeTitle, dataToUpdate){
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return updatedRecipe
    } catch (error){
        throw error
    }
}

app.post("/recipes/title/:recipeTitle", async (req, res) => {
    try {
        const updatedRecipe = await updateRecipe(req.params.recipeTitle, req.body)
        if(updatedRecipe){
            res.status(201).json({message: "Recipe updated successfully.", recipe: updatedRecipe})
        } else {
            res.status(404).json({error: "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update recipe data."})
    }
})

// 12. Create an API to delete a recipe with the help of a recipe id. Send an error message "Recipe not found" if the recipe does not exist. Make sure to handle errors properly.

// delete reciep by id funciton: 
async function findByIdAndDelete(recipeId){
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        return deletedRecipe
    } catch (error) {
        throw error
    }
}

// delete route 

app.delete("/recipes/:recipeId", async (req, res) => {
    try {
        const deletedRecipe = await findByIdAndDelete(req.params.recipeId)
        if(deletedRecipe){
            res.status(200).json({message: "Recipe deleted succussfully.", recipe: deletedRecipe})
        } else {
            res.status(404).json({error: "Recipe not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Error to deleting recipe."})
    }
})
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
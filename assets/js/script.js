
const searchButton = document.querySelector("#searchButton");
const recipeResults = document.querySelector("#recipeResults");
const textBox = document.querySelector("#textBox");
const apiKey = "2563b3155a0747ec8b0c5c273a182aff";
let query = "pasta";
let cuisine = "Italian";


function searchRecipes(event) {
  event.preventDefault();
  recipeResults.innerHTML = '';
  query = textBox.value;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&cuisine=${cuisine}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      const recipes = responseData.results;

      recipes.forEach((recipe) => {
        console.log(recipe);

        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("card");

        const recipeImg = document.createElement("div");
        recipeImg.classList.add("card-img");

        //recipeImg.setAttribute("id", recipe.id)

        const recipeTitle = document.createElement("span");
        recipeTitle.classList.add("card-title");

        const recipeContent = document.createElement("div");
        recipeContent.classList.add("card-content");
        

        recipeTitle.textContent = recipe.title;
        const imgSrc = document.createElement("img");
        imgSrc.src = recipe.image;

        

        //added button, still need help with redirecting
        const button = document.createElement("a");
        button.classList.add("btn", "waves-effect", "waves-light");
        button.textContent = "View Recipe";
        button.href = 'recipe.html';


        recipeDiv.addEventListener("click", function(event) {
            event.preventDefault();
            searchActualRecipe(recipe.id)
        });
        recipeResults.appendChild(recipeDiv);
        recipeDiv.appendChild(recipeImg);
        
        recipeContent.appendChild(button);


        recipeImg.appendChild(recipeTitle);
        recipeImg.appendChild(imgSrc);
        recipeTitle.appendChild(recipeContent);
        
      });
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

function searchActualRecipe(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${apiKey}&includeNutrition=false`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((responseData) => {
      const recipe = responseData;
        console.log(recipe)
        var detailsDiv = document.getElementById(recipeID)
        console.log(detailsDiv)
        window.open(recipe.spoonacularSourceUrl, "_blank")
        
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

searchButton.addEventListener("click", searchRecipes);

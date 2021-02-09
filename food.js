const searchBtn = document.getElementById('submit_food');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');

// event Listener
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

// ================

function getMealList() {
    let searchInputTxt = document.getElementById('inputSearch').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-3" data-id = "${meal.idMeal}">
                            <div class="food-item">
                               
                                <img class="img-fluid" src="${meal.strMealThumb}" alt="">
                                <h3>${meal.strMeal}</h3>
                                <button id="product-show" class="recipe-btn btn btn-primary">Details</button>
                            </div>
                        </div>
                    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, the food you searched for was not found, so choose another food";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        
        <h2>${meal.strMeal}</h2>
        <div class="row">
            <div class="col-12">
               
                <img src="${meal.strMealThumb}" alt="">
            </div>
        </div>
        <ul>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure1} ${meal.strIngredient1}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure2} ${meal.strIngredient2}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure3} ${meal.strIngredient3}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure4} ${meal.strIngredient4}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure5} ${meal.strIngredient5}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure6} ${meal.strIngredient6}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure7} ${meal.strIngredient7}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure8} ${meal.strIngredient8}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure9} ${meal.strIngredient9}</li>
            <li><span class="check-icon">&#x2714;</span>${meal.strMeasure10} ${meal.strIngredient10}</li>
        </ul>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
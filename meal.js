const search = document.getElementById('search'),
 submit = document.getElementById('submit'),
 mealsEl = document.getElementById('random'),
 resultHeading = document.getElementById('result-heading'),
 single_mealEl = document.getElementById('single-meal');
 mealss = document.getElementById("meals");
 var arr=[];let j=1;



async function searchMeal(e){
    single_mealEl.innerHTML = '';
    mealss.innerHTML='';

    //Get Search term
    const term = search.value;

    //check for empty
    if(term.trim())
    {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
        const data = await response.json();
        return [data,term];
    }
    else{
        alert('please enter a search term');
    }

}

    function adder(data,term)
    {
    resultHeading.innerHTML=`<h2>Search Results for ${term}:</h2>`;

    if(data.meals.length===1)
    {
        const key = Object.keys(data.meals[0]);
        key.forEach(element => {
            
            if(element==="strIngredient"+j)
            {
                let val = data.meals[0][element];
                if(val.trim()){
                arr[j-1]=val;
                }
                j++;
            }
            
        });
        
    
        const strMeal = document.createElement('H1');
        const strImg = document.createElement('li');
        const strCategory = document.createElement('H4');
        const ingredients = document.createElement("p");

        strImg.innerHTML=`<img class="small" src="${(data.meals[0].strMealThumb)}">`;
        strMeal.innerHTML=data.meals[0].strMeal;
        strCategory.innerHTML=`Category : ${data.meals[0].strCategory}`; 
        ingredients.innerHTML=`Ingredients : ${arr} `;

        single_mealEl.appendChild(strMeal);
        single_mealEl.appendChild(strImg);
        single_mealEl.appendChild(strCategory);
        single_mealEl.appendChild(ingredients);
        
    }
}
    


 //Event Listener

 submit.addEventListener('submit',(e)=>{
     e.preventDefault();
     searchMeal().then((arr)=>{
         const Data = arr[0];
         const Term = arr[1];
         adder(Data,Term);
        });
 });
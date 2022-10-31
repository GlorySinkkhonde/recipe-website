import { useEffect, useState } from "react";


function Popular() {

    //useState is used to store variables but when the contents of the variable changes, the UI of the app reacts

    //popular is the name given and setPopular is the function used to modify popular

    //an array is placed inside the useState variable because we are dealing with an array of objects but if it was a string, we would place a string and if was a boolean we would place a boolean inside the brackets and so on

    const [popular, setPopular] = useState([]);

    //setting it up so that the function getPopular runs when site is visited or loads... in the empty array, you can add other variables so mean, for example, if the search changes, load the site again, all this is done using useEffect()

    useEffect(() =>{
        getPopular();
    }, [])

    //getting the Api data

    const getPopular = async () => {
        const getApi = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
        
        const data = await getApi.json();

        // never use popular = data... go through the function instead

        setPopular(data.recipes)
    }

  return (

    //by mapping, we are looping through each item in the array and outputting 

    //{recipe.title is deconstruction}


    <div>

        {popular.map(recipe =>{
            return(

                //the key is so that each recipe/recipe title has a unique identifier so that it is identified easily in case it is modified or changed

                <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default Popular
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

//splide is the carousel component and splideslide is the individual slide or image

import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';


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

        //below we are checking the local storage to see if there are any items and if there are, we are setting our setpopular/where we are on the page to it and if there are no files in the local storage, we are fetching the data and setting the output to the local storage

        //because the local storage can only store strings, when fetching, we stringify the JSON before setting it in local storage and after it is stored, it needs to turn back into an array before being used and that's why we parsed it back into an array for use

        //while working on this project, I encountered a bug where the popular was returning undefined and I figured out, it was because I reached the total number of requests from the API, proud of myself everytime I figure out a problem like this

        const check = localStorage.getItem("popular")

        if(check){
            setPopular(JSON.parse(check))
        }else{
            const getApi = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
        
            const data = await getApi.json();

             // never use popular = data... go through the function instead

             localStorage.setItem("popular", JSON.stringify(data.recipes))

             setPopular(data.recipes)
             console.log(data.recipes)
        }
           
     
           
        }
    

  return (

    //by mapping, we are looping through each item in the array and outputting 

    //{recipe.title is deconstruction}

    //the key is so that each recipe/recipe title has a unique identifier so that it is identified easily in case it is modified or changed

    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
 
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                }}>
                  {popular.map(recipe =>{
                     return(
 
                         <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={'/recipe/' + recipe.id}>
                                   <h4>{recipe.title}</h4>
                                   <img src={recipe.image} alt={recipe.title} />
                                   <Gradient/>
                                </Link>
                              
                              
                            </Card>
                         </SplideSlide>
                        
                     )
                  })}
                </Splide>
 
        </Wrapper>
    </div>     
    
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h4{
        position: absolute;
        z-index: 10;
        left: 30%;
        bottom: 0%;
        transform: translate(-50, 0);
        color: white;
        width: 50%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center; 
    };

`

const Gradient = styled.div`

   z-index: 3;
   position: absolute;
   width: 100%;
   height: 100%;
   background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))  

`

export default Popular
/*

<NavLink to={'/cuisine/American'}>
            <FaHamburger />
            <h4>American</h4>
        </NavLink>
        <NavLink to={'/cuisine/American'}>
            <FaPizzaSlice />
            <h4>Italian</h4>
        </NavLink>
        <NavLink to={'/cuisine/American'}>
            <GiChopsticks />
            <h4>Japanese</h4>
        </NavLink>
        <NavLink to={'/cuisine/American'}>
            <GiNoodles />
            <h4>Thai</h4>
        </NavLink>
*/
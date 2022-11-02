import React from 'react'
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';

function Veggie() {

  const [Veggie, setVeggie] = useState([]);

    useEffect(() =>{
        getVeggie();
    }, [])

    const getVeggie = async () => {


        const check = localStorage.getItem("Veggie")

        if(check){
            setVeggie(JSON.parse(check))
        }else{
            const getApi = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`);
        
            const data = await getApi.json();


             localStorage.setItem("Veggie", JSON.stringify(data.recipes))

             setVeggie(data.recipes)
             console.log(data.recipes)
        }
      
  }

  return (
    <div>
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>
 
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem',
                }}>
                  {Veggie.map(recipe =>{
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

export default Veggie
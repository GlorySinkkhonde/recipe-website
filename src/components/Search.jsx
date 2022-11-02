import styled from 'styled-components';
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) =>{
        //to prevent form from refreshing when enter is clicked
        e.preventDefault();
        navigate('/searched/'+ input)
    }

  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
        <FaSearch></FaSearch>
        <input onChange={(e) => setInput(e.target.value)} type="text" value={input} />
       
        </div>  
    </FormStyle>
  )
}

const FormStyle = styled.form`

margin: 0rem 20rem;

div{
    width: 100%;
    position: relative;
}

input{
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    width: 100%;
    padding: .5rem 3rem;
    border-radius: .5rem;
}
svg{
    position: absolute;
    top: 30%;
    left: 1rem;
    transform: translate(100%, -50%)
    color: white;
}

`

export default Search
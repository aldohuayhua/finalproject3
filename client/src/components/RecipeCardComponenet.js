import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import InstructionsComponent from "./InstructionsComponent";
import API from '../utils/API';



const RecipeCardComponenet = ({ title, image, id, userID }) => {
    const [recipesInstructions, setRecipeInstructions] = useState([])
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

    useEffect(() => {
        getRecipesInstructions();
    }, [query]);

    const getRecipesInstructions = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${query}/information?includeNutrition=false&apiKey=${API_KEY}`);
        const data = await response.json();
        setRecipeInstructions(data);
        console.log(data);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(e.target.value);
        handleShow();
    }

    const saveRecipe = () => {

        
        window.location = "/profile"
        
        

        API.addFav(userID, {favRecipes:{
            title: title,
            image: image,
            recipesInstructions:recipesInstructions.instructions,

        }}).catch(err => console.log(err));
        console.log(userID)
        console.log(recipesInstructions.instructions)
    } 

    // const routeChange=()=> {
    //     let path = `/profile`;
    //     let history = useHistory();
    //     history.push(path);
    //   }

    

    return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <Button onClick={getSearch} value={id} variant="primary">Get Recipe</Button>
                </Card.Body>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Instructions for: {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InstructionsComponent instructions={recipesInstructions.instructions} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={saveRecipe} >
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
            </Card>

    )
}
export default RecipeCardComponenet;
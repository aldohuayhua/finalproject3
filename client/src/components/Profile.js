import React, { useEffect, Component } from "react";
import Button from "@material-ui/core/Button";
import RecipeCardComponenet from "./RecipeCardComponenet";
import AddIngredient from "./AddIngredient"
import Typography from "@material-ui/core/Typography";
import { fireAuth } from "../fireApi";
import API from '../utils/API';
import "./Profile.css";
// import Public from "./Public"
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'

class Profile extends Component {
  constructor(props) {
    console.log("props that have ID" + props);
    super(props)
    this.state = {
      recipes: [''],
      _id: this.props.activeUser.data._id,
      fBaseId: this.props.activeUser.data.fBaseId,
      pantry: this.props.activeUser.data.pantry,
      value: '',
      favRecipes: this.props.activeUser.data.favRecipes
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentDidMount() {
  //   this.loadUser();
  // }
  // loadUser = (uid) => {
  //   API.getUser(uid)
  //     .then(res =>
  //       this.setState({ activeUser: this.props.activeUser.data })
  //     )
  //     .catch(err => console.log(err));
  // };
  onChange = event => {
    this.setState({ value: event.target.value });
  };
// Addind to the Pantry
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({value:""})
    
    const userPantry = {
      id: this.state._id,
      newPantry: this.state.value
    }
    let dontMessWithState = new Array(...this.state.pantry)
    dontMessWithState.push(userPantry.newPantry)

    API.addPantry(userPantry.id, { pantry: userPantry.newPantry })
      .then(res => {
        this.setState({ pantry: dontMessWithState })
      })
      .catch(err => console.log(err));
  };

  // add to Fav on UI
  onAdd =()=>{
    console.log(this.props.recipesInstructions)
    // let dontMessWithState = new Array(...this.state.favRecipes)
    // dontMessWithState.push(userPantry.newPantry)
  }

  

// Deleting from Pantry
  onDeleteItem = (pantry, i) => {
    let newPantry = this.state.pantry.slice()
    newPantry.splice(i, 1)
    API.deletePantry(this.state._id, { pantry: pantry })
      .then(res => this.setState({ pantry: newPantry }))
      .catch(err => console.log(err));
  };


  onDeleteRecipe = (title, i) => {
    let newFav = this.state.favRecipes.slice()
    newFav.splice(i, 1)

  
    API.deleteFav(this.state._id, { title: title })
      .then(res => this.setState({ favRecipes: newFav }))
      .catch(err => console.log(err));
  };



  onLogOut() {
    window.location = "/"
  }



  // looking up API for recipes
  CurrentPantry = async (event) => {
    event.preventDefault();
    const rSearch = this.state.pantry.join();
    console.log(rSearch);
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${rSearch}&number=10&apiKey=60d9128af34b4f85baab35d9135e7ff3`);
    const data = await response.json();
    this.setState({ recipes: data });
    console.log(this.state.recipes)

  }


  render() {
    return (
      <React.Fragment>
        <Typography variant={"subtitle1"}>
          My name is <b>{this.props.displayName}</b>
        </Typography>


        <Typography variant={"subtitle1"}>
          My ID is <b>{this.props.id}</b>
        </Typography>

        <h1>HELLO: <b>{this.props.activeUser.data.username}</b>,</h1>

        <Typography variant={"subtitle1"}>
          {this.state.pantry.map((pantry, i) => <li className="deleteItem" data-value={pantry} key={i} >{pantry} <Button onClick={() => { this.onDeleteItem(pantry, i) }}>X</Button> </li>)}
        </Typography>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={this.onChange}
            name="pantry"
            type="text"
            placeholder="Add to pantry"
          />
          <Button type="submit" variant="contained" color="primary">
            Add Ingridient
                </Button>
        </form>

        <Typography variant={"subtitle1"}> THESE ARE UR FAVE RECIPES
          {this.state.favRecipes.map((favRecipes, i) =>

          <div className="favorite" data-value={favRecipes} key={i} >
            {favRecipes.title} <br />
            {favRecipes.recipesInstructions}
            <img src={favRecipes.image}></img>

            <Button onClick={() => { this.onDeleteRecipe(favRecipes.title, i) }}>X</Button>
          </div>)}
        </Typography>

       

        <Button variant={"contained"} onClick={() => { fireAuth.signOut(); this.onLogOut() }} >
          Logout
            </Button>

        <div className="App">
          <Button variant="contained" color="primary" type="submit" onClick={(event) => { this.CurrentPantry(event) }}>
            Search Recipes
              </Button>
          {this.state.recipes.map(recipe => (
            <RecipeCardComponenet
            saveRecipe={this.saveRecipe}
              userID={this.state._id}
              key={recipe.title}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
            />
          ))}
        </div>
      </React.Fragment>
    )
  }

}
export default Profile;
import React from "react";
<<<<<<< HEAD
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card, Accordion, Button } from "react-bootstrap";
import { fontFamily } from "@material-ui/system";
=======
import { Card} from "react-bootstrap";
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086

function Cards() {
  return (
    <div style={{ textAlign: "center", margin: "5%", marginTop:"15%" }}>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/35/35640.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Add Ingredients To Pantry</Card.Title>
      </Card>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/348/348770.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Search Recipes <br></br> List</Card.Title>
      </Card>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/1647/1647880.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Save Recipes</Card.Title>
      </Card>
      
      </div>
  );
}

<<<<<<< HEAD
export default Cards;
=======
export default Cards;
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086

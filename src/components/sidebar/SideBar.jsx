import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import bozo from '../../static/Bulk_Bozo_Banner.png';

class SideBar extends Component {
  render () {  
    const pathName = window.location.pathname;

    return (
      <div style={{padding: "0", width: "22em", borderRight: "1px solid #111111"}}>
        <Row>
          <img src={bozo} />
        </Row>
        <Row>
          <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
              borderBottom: pathName === "/import" ? "2px solid #ffc801" : "2px solid", fontFamily: "BasicFont"}} to="/import">Scan</Link>
        </Row>
        <Row>
          <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
              borderBottom: pathName === "/stock" ? "2px solid #ffc801" : "2px solid",fontFamily: "BasicFont"}} to="/stock">Stock</Link>
        </Row>
      </div>
    );
  };
}

export default SideBar;
import { Component } from "react";
import { Row } from "react-bootstrap";
import { Link, Image } from 'next/link'
import bozo from '../../../public/Bulk_Bozo_Banner.png';

class SideBar extends Component {
  render () {  
    const pathName = window.location.pathname;

    return (
      <div style={{padding: "0", width: "22em", borderRight: "1px solid #111111"}}>
        <Row>
          <Image alt={"Bozo"} src={bozo} />
        </Row>
        <Row>
          <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
              borderBottom: pathName === "/scan" ? "2px solid #ffc801" : "2px solid", fontFamily: "BasicFont"}} href="/scan">Scan</Link>
        </Row>
        <Row>
          <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
              borderBottom: pathName === "/inventory" ? "2px solid #ffc801" : "2px solid",fontFamily: "BasicFont"}} to="/inventory">Inventory</Link>
        </Row>
      </div>
    );
  };
}

export default SideBar;
import Head from 'next/head';
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideBar from "../components/sidebar/SideBar.jsx";

class Layout extends Component {
  render () {
    return (
        <Container style={{margin: "0", maxWidth: "100%"}}>
          <Row style={{height: "100%"}}>
            <Head>
              <title>
                Bozo Scanner
              </title>
            </Head>
            <SideBar />
            <Col style={{marginLeft: "6em"}}>
              { this.props.children }
            </Col>
          </Row>
        </Container>
    );
  };
}

export default Layout;
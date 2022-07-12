import React, { Component } from "react";
import Layout from "../containers/Layout.jsx";
import { Col } from 'react-bootstrap';

class NotFound extends Component {
  render () {
    return (
        <Layout>
            <br style={{marginTop: "4em"}} />
            <h1 style={{color: "white"}}>404: Not Found</h1>
            <p style={{color: "white"}}>
                Sorry but the page you are looking for does not exist, has been
                removed, name changed, or is temporarity unavailable.
            </p>
        </Layout>
    );
  };
}

export default NotFound;
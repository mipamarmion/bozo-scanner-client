import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../containers/Layout.jsx";
import TableContent from "../components/stock/table/TableContent.jsx";
import TableHeader from "../components/stock/table/TableHeader.jsx";

class StockList extends Component {
  render () {
    return (
        <Layout>
            <div className={"stock-wrapper"}>
              <Container style={{height: "80%", width: "100%"}}>
                <TableHeader />
                <TableContent />
              </Container>
            </div>
        </Layout>
    );
  };
}

export default StockList;
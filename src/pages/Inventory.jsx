import React, { Component } from "react";
import SneakerForm from "../components/import/SneakerForm.jsx";
import Layout from "../containers/Layout.jsx";

class InventoryManagement extends Component {
  render () {
    return (
        <Layout>
            <SneakerForm />
        </Layout>
    );
  };
}

export default InventoryManagement;
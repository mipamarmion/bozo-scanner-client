import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { getInventory } from '../../helper/consumer';
import TableItem from "./TableItem.jsx";

class TableContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skuData: [],
      isLoading: true
    };

    this.getTableContent = this.getTableContent.bind(this);
  }

  componentDidMount() {
    getInventory().then((response) => {
      let state = this.state;

      if(response.error) {

      } else {
        state.skuData = response.result;
        state.isLoading = false;
      }

      this.setState(state);
    });
  }

  getTableContent() {
    let tableItems = [];
    for(skuItem of this.state.skuData) {
      tableItems.push(
        <TableItem skuItem={skuItem} />
      );
    }
  }

  render () {
    return (
      <div className={"stock-list"}>
        {this.state.isLoading ? <FontAwesomeIcon icon={faSpinner} /> : this.getTableContent()}
      </div>
    );
  };
}

export default TableContent;
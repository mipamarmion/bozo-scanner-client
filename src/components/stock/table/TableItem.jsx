import React, { Component } from "react"
import { Row } from 'react-bootstrap'
import Checkbox from '../../custom/Checkbox.jsx'

class TableItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className={"stock-list"}>
        <Row className={this.props.color === 'light' ? 'stock-item-light' : 'stock-item-dark'}>
          <Checkbox />
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.sku}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.make}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.model}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.modelNumber}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.color}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.size}</span>
          <span style={{
            width: "14%",
          }}>{this.props.skuItem.count}</span>
        </Row>
      </div>
    );
  };
}

export default TableItem;

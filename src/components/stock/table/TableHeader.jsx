import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className={"stock-list"}>
        <Row className={'stock-item-dark'}>
          <span style={{
            width: "14%",
          }}>SKU</span>
          <span style={{
            width: "14%",
          }}>Make</span>
          <span style={{
            width: "14%",
          }}>Model</span>
          <span style={{
            width: "14%",
          }}>Model Number</span>
          <span style={{
            width: "14%",
          }}>Color</span>
          <span style={{
            width: "14%",
          }}>Size</span>
          <span style={{
            width: "14%",
          }}>Count</span>
        </Row>
        <Row className={'stock-item-light'}>
          <span style={{
            width: "14%",
          }}>SKU</span>
          <span style={{
            width: "14%",
          }}>Make</span>
          <span style={{
            width: "14%",
          }}>Model</span>
          <span style={{
            width: "14%",
          }}>Model Number</span>
          <span style={{
            width: "14%",
          }}>Color</span>
          <span style={{
            width: "14%",
          }}>Size</span>
          <span style={{
            width: "14%",
          }}>Count</span>
        </Row>
      </div>
    );
  };
}

export default TableHeader;

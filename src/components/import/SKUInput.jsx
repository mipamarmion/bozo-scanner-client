import React, { Component } from 'react';
import { InputGroup, FormControl, Row, Overlay, Tooltip } from 'react-bootstrap';
import { getSkuData } from '../../helper/consumer.js'; 
import Checkbox from '../custom/Checkbox.jsx';

const AUTO_FILL_BUFFER = 1000;

class SKUInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastSkuRequest: "",
      isLoading: false,
      autoFill: true,
      showSubmitTooltip: false,
      showSubmitTooltip: false,
      autoFillBuffer: false
    };

    this.autoFillDidChange = this.autoFillDidChange.bind(this);
    this.startBufferTimer = this.startBufferTimer.bind(this);
    this.bufferTimerDidFinish = this.bufferTimerDidFinish.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.skuDidChange = this.skuDidChange.bind(this);
    this.getSkuData = this.getSkuData.bind(this);
  }

  startBufferTimer() {
    let state = this.state;
    
    new Promise((resolve) => {setTimeout(resolve, AUTO_FILL_BUFFER)})
    .then(() => {
      this.bufferTimerDidFinish();
    });

    state.autoFillBuffer = true;

    this.setState(state);
  }

  bufferTimerDidFinish() {
    let state = this.state;

    state.autoFillBuffer = false;

    this.setState(state);
    this.toggleLoading(false);
    if(state.lastSkuRequest !== this.props.sku) {
      this.getSkuData(this.props.sku);
    }
  }

  autoFillDidChange() {
    let state = this.state;

    state.autoFill = state.autoFill ? false : true;

    this.setState(state);
  }
  
  toggleTooltip(tooltip) {
    let state = this.state;

    if(tooltip === "fill") {
      state.showFillTooltip = state.showFillTooltip ? false : true;
    } else if(tooltip === "submit") {
      state.showSubmitTooltip = state.showSubmitTooltip ? false : true;
    }

    this.setState(state);
  }

  toggleLoading(value) {
    this.props.onIsLoadingChange(value);
  }

  render() {
    return (
      <Row>
        <InputGroup>
          <FormControl
            placeholder="SKU"
            aria-label="SKU"
            aria-describedby="sku"
            onChange={this.props.skuDidChange}
            value={this.props.sku}
            style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}}
            disabled={this.props.disabled}
            ref={this.props.forwardedRef}
          />
        </InputGroup>
      </Row>
    );
  }
}

export default SKUInput;

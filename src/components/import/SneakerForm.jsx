import React, { Component } from 'react';
import { Button, Row, Col, Form, Overlay, Tooltip  } from 'react-bootstrap';
import SKUInput from './SKUInput.jsx';
import FilterDropdown from './FilterDropdown.jsx';
import { newSku, updateSkuStock, deleteSku } from '../../helper/consumer';
import Checkbox from '../custom/Checkbox.jsx';

class SneakerForm extends Component {
  constructor(props) {
    super(props);

    this.skuInputRef = React.createRef();
    this.autofillBox = React.createRef();
    this.autoSubmitBox = React.createRef();

    this.state = {
        skuData: {
          sku: "",
          make: "",
          model: "",
          model_number: "",
          color: "",
          size: "",
          count: 0
        },
        invalidFields: {
          sku: true,
          make: true,
          model: true,
          model_number: true,
          color: true,
          size: true,
        },
        tooltips: {
          submit: false,
          fill: false
        },
        submittedSkuQueue: [],
        isSubmitting: false,
        autoSubmit: false,
        autoFill: true,
        partialMatchCount: 0,
        isLoading: false
    };

    this.skuDidChange = this.skuDidChange.bind(this);
    this.sizeDidChange = this.sizeDidChange.bind(this);
    this.colorDidChange = this.colorDidChange.bind(this);
    this.makeDidChange = this.makeDidChange.bind(this);
    this.modelDidChange = this.modelDidChange.bind(this);
    this.modelNumberDidChange = this.modelNumberDidChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.isLoadingDidChange = this.isLoadingDidChange.bind(this);
    this.importSkuData = this.importSkuData.bind(this);
    this.getHighestMatchRatio = this.getHighestMatchRatio.bind(this);
    this.undoLastSubmission = this.undoLastSubmission.bind(this);
    this.skuDataDidChange = this.skuDataDidChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.onAutoSubmitChange = this.onAutoSubmitChange.bind(this);
    this.onAutoFillChange = this.onAutoFillChange.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  importSkuData(sharedSkuData) {
    let state = this.state;

    state.skuData.make = sharedSkuData.make;
    state.skuData.model = sharedSkuData.model;
    state.skuData.model_number = sharedSkuData.model_number;
    state.skuData.color = sharedSkuData.color;
    state.skuData.size = sharedSkuData.size;
    state.skuData.count = sharedSkuData.count;

    this.setState(state);

    if(this.state.autoSubmit) {
      this.submitForm();
    }
  }

  getHighestMatchRatio(partialMatches) {
    let highestRatio = {
      partialMatchRatio: 0
    };

    for(let partialMatch of partialMatches) {
      if(highestRatio.partialMatchRatio < partialMatch.partialMatchRatio) {
        highestRatio = partialMatch;
        highestRatio.count = 0;
        highestRatio.size = "";
      }
    }

    this.importSkuData(highestRatio);
  }

  skuDidChange(sku) {
    let state = this.state;

    state.skuData.sku = sku;

    this.setState(state);
  }

  skuDataDidChange(skuData) {
    let state = this.state;

    state.partialMatchCount = skuData.partialMatchCount;
  
    if(Object.keys(skuData.exactMatch ? skuData.exactMatch : {}).length) {
      this.importSkuData(skuData.exactMatch);
    } else if(state.partialMatchCount) {
      this.getHighestMatchRatio(skuData.partialMatches);
    } else {
      this.importSkuData({
        make: "",
        model: "",
        model_number: "",
        color: "",
        size: "",
        count: 0
      });
    }
  
    this.setState(state);
  }

  sizeDidChange(size) {
    let state = this.state;

    state.skuData.size = size;

    this.setState(state);
  }

  colorDidChange(element) {
    let state = this.state;

    state.skuData.color = element.target.value;

    this.setState(state);
  }

  makeDidChange(value) {
    let state = this.state;

    state.skuData.make = value;

    this.setState(state);
  }

  modelDidChange(element) {
    let state = this.state;

    state.skuData.model = element.target.value;

    this.setState(state);
  }

  modelNumberDidChange(element) {
    let state = this.state;

    state.skuData.model_number = element.target.value;

    this.setState(state);
  }
  
  isLoadingDidChange(isLoading) {
    let state = this.state;

    state.isLoading = isLoading;

    this.setState(state);
  }

  onAutoSubmitChange(autoSubmit) {
    let state = this.state;
    
    state.autoSubmit = autoSubmit;

    this.setState(state);
  }

  onAutoFillChange(autoFill) {
    let state = this.state;
    
    state.autoFill = autoFill;

    this.setState(state);
  }

  undoLastSubmission() {
    let state = this.state;
    let lastSubmittedSku = state.submittedSkuQueue[state.submittedSkuQueue.length - 1];

    if(lastSubmittedSku.count === 0) {
      deleteSku(lastSubmittedSku.sku)
      .then((result) => {
        let state = this.state;

        if(result.error) {

        } else {
          state.submittedSkuQueue.pop();
        }

        this.setState(state);
      })
    } else {
      updateSkuStock({sku: lastSubmittedSku.sku, count: lastSubmittedSku.count})
      .then((result) => {
        let state = this.state;

        if(result.error) {

        } else {
          state.submittedSkuQueue.pop();
        }

        this.setState(state);
      })
    }

    this.setState(state);
  }

  submitForm() {
    if(!this.isFormValid()) {
      return;
    }
    let state = this.state;

    state.isSubmitting = true;

    if(state.skuData.count === 0) {
      state.skuData.count = 1;
      newSku(state.skuData)
      .then((result) => {
        let state = this.state;

        state.isSubmitting = false;
  
        if(result.result) {
          state.skuData.sku = "";
          state.isLoading = false;
          state.submittedSkuQueue.push({sku: this.state.skuData.sku, count: 0});
        } else {
          state.isLoading = false;
          console.error(result?.error);
        }
  
        this.setState(state);
        this.skuInputRef.current.focus();
      });
    } else {
      updateSkuStock({sku: this.state.skuData.sku, count: this.state.skuData.count + 1})
      .then((result) => {
        let state = this.state;

        state.isSubmitting = false;
  
        if(result.result) {
          state.skuData.sku = "";
          state.skuData.count += 1;
          state.submittedSkuQueue.push({sku: this.state.skuData.sku, count: this.state.skuData.count});
          state.isLoading = false;
        } else {
          state.isLoading = false;
          console.error(result?.error);
        }
  
        this.setState(state);
        this.skuInputRef.current.focus();
      });
    }
    
    this.setState(state);
  }

  isFormValid() {
    let state = this.state;
    let invalid = !this.state.skuData.model_number || !this.state.skuData.sku || !this.state.skuData.size ||
    !this.state.skuData.color || !this.state.skuData.make || !this.state.skuData.model;

    state.invalidFields.sku = !this.state.skuData.sku;
    state.invalidFields.model_number = !this.state.skuData.model_number;
    state.invalidFields.make = !this.state.skuData.make;
    state.invalidFields.color = !this.state.skuData.color;
    state.invalidFields.size = !this.state.skuData.size;
    state.invalidFields.model = !this.state.skuData.model;

    this.setState(state);
    return !invalid;
  }

  toggleTooltip(tooltip) {
    let state = this.state;

    state.tooltips[tooltip] = !state.tooltips[tooltip];

    this.setState(state);
  }

  render() {
    return (
      <Form className="container" style={{fontFamily: "BasicFont", marginLeft: "0"}}>
        <h2 style={{color: "white", marginBottom: "2em", marginTop: "1.7em"}}>SKU Scanner</h2>
        <Row>
          <Col>
            <Form.Control 
              disabled={this.state.isSubmitting} 
              value={this.state.skuData.sku} 
              onChange={this.skuDidChange} 
              placeholder="Sku" 
              style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <Form.Control 
              disabled={this.state.isSubmitting} 
              value={this.state.skuData.color} 
              onChange={this.colorDidChange} 
              placeholder="Color" 
              style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <FilterDropdown 
              isInvalid={this.state.invalidFields.size} 
              disabled={this.state.isLoading} 
              value={this.state.skuData.size} 
              onChange={this.sizeDidChange} 
              field={"size"} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <Form.Control 
              disabled={this.state.isLoading} 
              value={this.state.skuData.color} 
              onChange={this.colorDidChange} 
              placeholder="Color" 
              style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <FilterDropdown 
              isInvalid={this.state.invalidFields.make} 
              disabled={this.state.isLoading} 
              value={this.state.skuData.make} 
              onChange={this.makeDidChange} 
              field={"make"} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <Form.Control 
              disabled={this.state.isLoading} 
              value={this.state.skuData.model} 
              onChange={this.modelDidChange} 
              placeholder="Model Name" 
              style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <Form.Control 
              disabled={this.state.isLoading} 
              value={this.state.skuData.model_number} 
              onChange={this.modelNumberDidChange} 
              placeholder="Model Number" 
              style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}} />
            <div style={{borderBottom: "1px solid #ffc801"}}></div>
            <br />
            <Button 
              disabled={this.state.isLoading} 
              onClick={this.submitForm} 
              style={{float: "right", backgroundColor: "#f3f3f3", color: "#5c5c5c"}} 
              variant="dark">
              Stock
            </Button>
            <Button 
              disabled={this.state.isLoading || !this.state.submittedSkuQueue.length} 
              onClick={this.undoLastSubmission} 
              style={{float: "right", marginRight: "0.25em", backgroundColor: "#9F9F9F", borderColor: "#7A7A7A"}} 
              variant="secondary">
              Undo
            </Button>
            <Row style={{alignContent: "center", alignItems:"center", width: "100%"}}>
              <Form.Label column="lg" lg={2} className={"text-white w-50"}>
                {"Count: " + this.state.skuData.count}
              </Form.Label>
              <div style={{height: "2.5em", width: "15em"}} id="autosubmit-box" ref={this.autoSubmitBox}>
                <div style={{color: "white", display: "inline-block", margin: "0 0.7em 0.5em 0"}}>Auto Submit</div>
                <Checkbox value={this.state.autoSubmit} onChange={this.onAutoSubmitChange} />
              </div>
              <div style={{height: "2.5em", width: "10em"}} id="autofill-box" ref={this.autofillBox}>
                <div style={{color: "white", display: "inline-block"}}>Auto Fill</div>
                <Checkbox value={this.state.autoFill} onChange={this.onAutoFillChange} />
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
}


export default SneakerForm;
import React, { Component } from 'react';
import { Dropdown, Row, InputGroup, FormControl } from 'react-bootstrap';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDistincts } from '../../helper/consumer';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);

    this.dropdownRef = React.createRef();

    this.state = {
        distinctValues: [],
        filteredValues: [],
        dropdownItems: [],
        selectedValue: "",
        isLoading: true,
        isSelecting: false,
        showDropdown: false
    };

    this.fieldSearchDidChange = this.fieldSearchDidChange.bind(this);
    this.selectFieldItemDidChange = this.selectFieldItemDidChange.bind(this);
    this.filterValues = this.filterValues.bind(this);
    this.getDropdownItems = this.getDropdownItems.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleBlur = this.toggleBlur.bind(this);
    this.toggleIsSelecting = this.toggleIsSelecting.bind(this);
  }

  componentDidMount() {
    getDistincts(this.props.field)
    .then((result) => {
      let state = this.state;

      if(result.result) {
        state.distinctValues = result.result;
        state.filteredValues = result.result.sort();
        state.isLoading = false;
      } else {
        console.error(result?.error);
      }

      this.setState(state);
      this.getDropdownItems();
    });
  }

  fieldSearchDidChange(element) {
    let selectedValue = element.target.value;
    let state = this.state;

    state.selectedValue = selectedValue;

    this.setState(state);
    this.filterValues();
    this.props.onChange(state.selectedValue);
  }

  filterValues() {
    let state = this.state;
    let newFilteredValues = [];

    if(!state.selectedValue) {
      state.filteredValues = state.distinctValues.sort();
    } else {
      for(let distinctValue of state.distinctValues) {
        if(distinctValue.toLowerCase().startsWith(state.selectedValue.toLowerCase())) {
          newFilteredValues.push(distinctValue.charAt(0).toUpperCase() + distinctValue.slice(1));
        }
      }
      
      state.filteredValues = newFilteredValues.sort();
    }

    this.setState(state);
    this.getDropdownItems();
  }

  selectFieldItemDidChange(item) {
    let state = this.state;

    state.selectedValue = item;
    state.showDropdown = false;

    this.setState(state);
    this.filterValues();
    this.props.onChange(state.selectedValue);
  }

  toggleDropdown() {
    let state = this.state;

    state.showDropdown = true;

    this.setState(state);
  }

  toggleBlur() {
    if(this.state.isSelecting) {
      return;
    }
    let state = this.state;

    state.showDropdown = false;

    this.setState(state);
  }

  getDropdownItems() {
    let state = this.state;
    let dropdownItems = [<Dropdown.Item onMouseEnter={this.toggleIsSelecting} onMouseLeave={this.toggleIsSelecting} onClick={() => this.selectFieldItemDidChange(this.state.selectedValue)} value={this.state.selectedValue} key={this.state.selectedValue +  "-typed"} style={{color: "white"}}>{'"' + this.state.selectedValue + '"'}</Dropdown.Item>];

    for(let dropdownItem of this.state.filteredValues) {
      dropdownItems.push(<Dropdown.Item onMouseEnter={this.toggleIsSelecting} onMouseLeave={this.toggleIsSelecting} onClick={() => this.selectFieldItemDidChange(dropdownItem)} value={dropdownItem} key={dropdownItem} style={{color: "white"}}>{dropdownItem}</Dropdown.Item>);
    }

    state.dropdownItems =  dropdownItems;;

    this.setState(state);
  }

  toggleIsSelecting() {
    let state = this.state;

    state.isSelecting = state.isSelecting ? false : true;

    this.setState(state);
  }

  render() {
    const field = this.props.field;
    const upperField = field.charAt(0).toUpperCase() + field.slice(1);

    return (
      <Row>
        <InputGroup ref={this.dropdownRef}>
          <FormControl
            placeholder={upperField}
            aria-label={upperField}
            aria-describedby={field}
            onChange={this.fieldSearchDidChange}
            value={this.props.value}
            onFocus={this.toggleDropdown}
            onBlur={this.toggleBlur}
            disabled={this.props.disabled || this.state.isLoading}
            style={{backgroundColor: "#202020", border: "none", color: "#dfdfdf"}}
          />
          <InputGroup.Text style={{background: "none", border: "none"}} className={"text-white"}>
            <FontAwesomeIcon color='#ffc801' icon={faCaretLeft} />
          </InputGroup.Text>
        </InputGroup>
        <Dropdown.Menu show={this.state.showDropdown} style={{width: Number.parseInt(this.dropdownRef.current?.clientWidth ? this.dropdownRef.current?.clientWidth : 0) - 21 + "px", marginTop: "2.5em", marginLeft: "0.7em", backgroundColor: "#5c5c5c"}}>
          {this.state.dropdownItems}
        </Dropdown.Menu>
      </Row>
    );
  }
}

export default FilterDropdown;

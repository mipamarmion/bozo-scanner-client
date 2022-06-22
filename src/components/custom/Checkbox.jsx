import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className={'custom-checkbox'} onClick={() => this.props.onChange(!this.props.value)}>
        <FontAwesomeIcon icon={faCheck} color="white" className={"mx-auto"} style={{marginTop: "0.7em", display: this.props.value ? "block" : "none"}} />
      </div>
    );
  };
}

export default Checkbox;
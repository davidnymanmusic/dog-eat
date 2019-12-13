import React from "react";
import "./modal.css";
import PropTypes from "prop-types";
import { IoIosCloseCircle } from "react-icons/io";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    const no = { height: "2em", width: "2em", color: "#f20a42" };
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Add New Food</h2>
        <div className="content">{this.props.children}</div>

        <button
          className="toggle-button no"
          style={{ backgroundColor: "white" }}
        >
          <IoIosCloseCircle
            style={{ ...no, height: 40, width: 40 }}
            onClick={this.onClose}
          ></IoIosCloseCircle>
        </button>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

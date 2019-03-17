import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

import "react-datepicker/dist/react-datepicker.css";

class TitleSlide extends Component {

  constructor(props){
    super(props);

    this.state = {
      title: this.props.currentSlide.title,
      subtitle: this.props.currentSlide.subtitle,
      author: this.props.currentSlide.author,
      date: this.props.currentSlide.date
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubTitleChange = this.handleSubTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.prepareSlide = this.prepareSlide.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubTitleChange(event) {
    this.setState({subtitle: event.target.value});
  }

  handleAuthorChange(event) {
    this.setState({author: event.target.value});
  }

  handleDateChange(date) {
    this.setState({date: date});
  }

  prepareSlide(event) {
    let slide = this.state;
    this.props.saveSlide(slide);
  }

  render() {
    return (
      <div id="titleslide-editor">
        <table>
          <tbody>
            <tr>
              <td><label>Title:</label></td>
              <td><input className="slidetitel" id="title" maxLength="40" type="text" value={this.state.title} onChange={this.handleTitleChange}/></td>
              <td><label>Subtitle:</label></td>
              <td><input className="slidetitel"  id="subtitle" maxLength="80" type="text" value={this.state.subtitle} onChange={this.handleSubTitleChange}/></td>
            </tr>
            <tr>
              <td><label>Author:</label></td>
              <td><input className="slidetitel"  id="author" maxLength="20" type="text" value={this.state.author} onChange={this.handleAuthorChange}/></td>
              <td><label>Date:</label></td>
              <td><DatePicker className="slidetitel" id="date" selected={this.state.date} onChange={this.handleDateChange} dateFormat="dd/MM/yyyy" /></td>
            </tr>
            <tr>
              <td className="btn-td"><FontAwesomeIcon title="Save changes" icon={faCheck} size="2x" className="icon-button" onClick={this.prepareSlide}/></td>
              <td className="btn-td"><FontAwesomeIcon title="Discard changes" icon={faTimes} size="2x" className="icon-button" onClick={this.props.cancelSlide}/><FontAwesomeIcon title="Delete slide" icon={faTrash} size="2x" className="icon-button" onClick={this.props.deleteSlide}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TitleSlide;

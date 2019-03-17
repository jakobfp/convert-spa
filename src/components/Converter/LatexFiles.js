import React, { Component } from "react";
import api from '../../api-config.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ImageDropzone from "./ImageDropzone.js"

class Latex extends Component {
  constructor(props){
    super(props);

    this.state = {
      uploaded_bib: <FontAwesomeIcon icon="times" />,
      bibname: ""
    }

    this.handleBibFileChange = this.handleBibFileChange.bind(this);

  }

  handleBibFileChange(event){
    this.setState({bibname: event.target.value});
    this.props.setError("");


    const data = new FormData();
    data.append('file', this.props.bibInput.current.files[0]);
    data.append('path', this.props.uploaded_file_path);

    console.log(data.getAll('path'));

    fetch(api.upload, {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === true){
        this.setState({uploaded_bib: <FontAwesomeIcon icon="check-square" />});
        this.props.setBibFile(response.file_path);
      }
      else {
        this.props.setError(response.error);
      }
    });
  }

  render() {
    return(
      <div>
        <h6>1.1. Upload bib-File</h6>
        <input type="file" ref={this.props.bibInput} value={this.state.bibname} onChange={this.handleBibFileChange}/> {this.state.uploaded_bib}
        <h6>1.2. Upload images - Drag & Drop here</h6>
        <ImageDropzone images={this.props.images} uploaded_file_path={this.props.uploaded_file_path} setError={this.props.setError} setImages={this.props.setImages}/>
      </div>
    );
  }
}

export default Latex;

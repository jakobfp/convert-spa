import React, { Component } from "react";
import api from './api-config.js';


import ImageDropzone from "./ImageDropzone.js"

class Latex extends Component {
  constructor(props){
    super(props);

    this.state = {
      uploaded_bib_file_path: ""
    }

    this.handleBibFileChange = this.handleBibFileChange.bind(this);

  }

  handleBibFileChange(event){
    this.props.setBibFileName(event.target.value);
    this.props.setError("");

    const data = new FormData();
    data.append('file', this.props.bibInput.current.files[0]);
    data.append('path', this.props.state.uploaded_file_path);

    console.log(data.getAll('path'));

    fetch(api.upload, {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === true){
        this.setState({uploaded_bib_file_path: response.file_path});
        this.props.setBibFile(this.state.uploaded_bib_file_path);
      }
      else {
        this.props.setError(response.error);
      }
    });
  }

  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <h6>1.1. Upload bib-File</h6>
          <input type="file" ref={this.props.bibInput} value={this.props.state.bibname} onChange={this.handleBibFileChange}/>
          <h6>1.2. Upload images - Drag & Drop here</h6>
          <ImageDropzone />
          <h4>2. Select design</h4>
          <select value={this.props.state.design} onChange={this.props.handleDesignChange}>
            <option value=''>select a design</option>
            <option value="htwberlin">HTW Berlin</option>
          </select>
          <h4>3. Convert & Download</h4>
          <input type="submit" value="Do!" />
        </form>
      </div>
    );
  }
}

export default Latex;

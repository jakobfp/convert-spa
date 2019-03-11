import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from './api-config.js';

import Latex from "./Latex-Files.js";

import {Circle} from 'better-react-spinkit';

const download_file = (url, name) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

class Converter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploaded: <FontAwesomeIcon icon="times" />,
      filename: "",
      filetype: "",
      download_url: "",
      design: "",
      uploaded_file_path: "",
      error: "",
      isLoading: false,
      bibFile: "",
      images: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDesignChange = this.handleDesignChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setBibFile = this.setBibFile.bind(this);
    this.setError = this.setError.bind(this);
    this.setImages = this.setImages.bind(this);

    this.fileInput = React.createRef();
    this.bibInput = React.createRef();
  }

  setBibFile(bibFile){
    this.setState({bibFile: bibFile});
  }

  setError(error){
    this.setState({error: error});
  }

  setImages(image){
    this.setState({images: [...this.state.images, image]})
  }

  handleDesignChange(event){
    this.setState({design: event.target.value});
  }

  handleFileChange(event){
    this.setState({filename: event.target.value});
    this.setState({error: ""});

    const data = new FormData();
    data.append('file', this.fileInput.current.files[0]);

    fetch(api.upload, {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === true){
        this.setState({uploaded: <FontAwesomeIcon icon="check-square" />});
        this.setState({uploaded_file_path: response.file_path});
        this.setState({filetype: response.file_type});
        console.log(this.state);
      }
      else {
        this.setState({error: response.error});
      }
    });
  }

  handleSubmit(event){
    this.setState({error: ""});
    if(this.state.design === ""){
      this.setState({error: "no design select, please select one!"});
    }
    else {
      const api_call = api[this.state.filetype];
      var convertParams = `file=${this.state.uploaded_file_path}&design=${this.state.design}`;
      if (this.state.bibFile !== ""){
        convertParams += `&bib_file=${this.state.bibFile}`
      }
      this.setState({isLoading: true});
      fetch(api_call + convertParams, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(response => {
        if(response.success === true){
          const downloadParams = `file=${response.file_path}`;
          this.setState({download_url : api.download+downloadParams});
          download_file(this.state.download_url, response.file_name);
          this.setState({isLoading: false});
        } else {
          this.setState({error: response.error});
          this.setState({isLoading: false});
        }
      });
      this.clearForm();
    }
  }

  clearForm(){
    this.setState({
      filename: "",
      filetype: "",
      design: "",
      uploaded: <FontAwesomeIcon icon="times" />,
      download_url: "",
      uploaded_file_path: "",
      error: "",
      bibFile: "",
      images: []
    });
    this.fileInput = React.createRef();
    this.bibInput = React.createRef();
  }

  render() {
    return (
      <div>
        {this.state.error !== "" ? (<div id="error"><p>{this.state.error}</p></div>) : (<p></p>)}
        <h2>HTW Corporate Identity Converter</h2>
        <p>With this Application you can convert Latex articles and presentations as well as Word documents in the corporate design of HTW Berlin.</p>
        {this.state.isLoading ? (<div id="loading-spinner"><div className="center-circle"><Circle size={100}/></div></div>) : (<p></p>)}
        <h4>1. Upload file</h4>
        <input type="file" ref={this.fileInput} value={this.state.filename} onChange={this.handleFileChange}/> {this.state.uploaded}
        {this.state.filetype === 'tex' ?
          (<Latex images={this.state.images} uploaded_file_path={this.state.uploaded_file_path} setError={this.setError} setBibFile={this.setBibFile} bibInput={this.bibInput} setImages={this.setImages}/>) :
          (<p></p>)
        }
        <form onSubmit={this.handleSubmit}>
          <h4>2. Select design</h4>
          <select value={this.state.design} onChange={this.handleDesignChange}>
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

export default Converter;

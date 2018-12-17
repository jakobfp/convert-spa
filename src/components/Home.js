import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from './api-config.js';

import Word from "./Word.js"
import Latex from "./Latex.js"

var Spinner = require('react-spinkit');

const download_file = (url, name) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

class Home extends Component {

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
      bibname: "",
      bibFile: "",
      images: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDesignChange = this.handleDesignChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.setBibFileName = this.setBibFileName.bind(this);
    this.setBibFile = this.setBibFile.bind(this);
    this.setError = this.setError.bind(this);

    this.fileInput = React.createRef();
    this.bibInput = React.createRef();
  }

  setBibFile(bibFile){
    this.setState({bibFile: bibFile});
  }

  setBibFileName(bibname){
    this.setState({bibname: bibname});
  }

  setError(error){
    this.setState({error: error});
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
      const api_call = this.state.filetype === 'tex' ? api.convert_tex : api.convert_docx;
      var convertParams = `file=${this.state.uploaded_file_path}&design=${this.state.design}`;
      if (this.state.bibFile !== ""){
        convertParams += `&bib_file=${this.state.bibFile}`
      }
      console.log(convertParams);
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
      bibname: "",
      bibFile: ""
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
        {this.state.isLoading ? (<Spinner id="loading-spinner" name="wave" fadeIn="none"/>) : (<p></p>)}
        <h4>1. Upload file</h4>
        <input type="file" ref={this.fileInput} value={this.state.filename} onChange={this.handleFileChange}/> {this.state.uploaded}
        {this.state.filetype === 'docx' ?
          (<Word state={this.state} handleSubmit={this.handleSubmit} handleDesignChange={this.handleDesignChange} setError={this.setError}/>) :
          (<Latex state={this.state} handleSubmit={this.handleSubmit} handleDesignChange={this.handleDesignChange} setError={this.setError} setBibFile={this.setBibFile} setBibFileName={this.setBibFileName} bibInput={this.bibInput}/>)
        }
      </div>
    );
  }
}

export default Home;

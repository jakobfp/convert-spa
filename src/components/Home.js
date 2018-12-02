import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from './api-config.js';

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
      download_url: "",
      design: "",
      uploaded_file_path: "",
      error: "",
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDesignChange = this.handleDesignChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.fileInput = React.createRef();
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
      this.setState({isLoading: true});
      const convertParams = `file=${this.state.uploaded_file_path}&design=${this.state.design}`;
      fetch(api.convert+convertParams, {
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
        }
      });
      this.clearForm();
    }
  }

  clearForm(){
    this.setState({
      filename: "",
      design: "",
      uploaded: <FontAwesomeIcon icon="times" />,
      download_url: "",
      uploaded_file_path: "",
      error: ""
    });
    this.fileInput = React.createRef();
  }

  render() {
    return (
      <div>
        {this.state.error != "" ? (<div id="error"><p>{this.state.error}</p></div>) : (<p></p>)}
        <h2>HELLO</h2>
        <p>With this Application you can convert Latex articles and presentations as well as Word documents in the corporate design of HTW Berlin.</p>
        {this.state.isLoading ? (<Spinner id="loading-spinner" name="wave" fadeIn="none"/>) : (<p></p>)}
        <form onSubmit={this.handleSubmit}>
          <h5>1. Upload file</h5>
          <input type="file" ref={this.fileInput} value={this.state.filename} onChange={this.handleFileChange}/> {this.state.uploaded}
          <h5>2. Select design</h5>
          <select value={this.state.design} onChange={this.handleDesignChange}>
            <option value=''>select a design</option>
            <option value="htwberlin">HTW Berlin</option>
          </select>
          <h5>3. Convert & Download</h5>
          <input type="submit" value="Do!" />
        </form>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {uploaded: <FontAwesomeIcon icon="times" />, filename: "", download: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDesignChange = this.handleDesignChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);

    this.fileInput = React.createRef();
  }

  handleSubmit(event){
    fetch(`http://localhost:5000/api/convert?file=${this.state.filename}&design=${this.state.design}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      if(response === true)
        this.setState({download: <form onSubmit={this.handleDownload}><h5>4. Download</h5><input type="submit" value="Download"/></form>});
      else
        this.setState({download: `${response.error}`});
    });
  }

  handleDesignChange(event){
    this.setState({design: event.target.value});
  }

  handleFileChange(event){
    this.setState({filename: event.target.value});

    const data = new FormData();
    data.append('file', this.fileInput.current.files[0]);

    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(response => {
      if(response === true)
        this.setState({uploaded: <FontAwesomeIcon icon="check-square" />});
      else
        this.setState({uploaded: `${response.error}`});
    });
  }

  handleDownload(event){
    // todo : download 
    console.log("download...");
  }

  render() {
    return (
      <div>
        <h2>HELLO</h2>
        <p>With this Application you can convert Latex articles and presentations as well as Word documents in the corporate design of HTW Berlin.</p>
        <form onSubmit={this.handleSubmit}>
          <h5>1. Upload file</h5>
          <input type="file" ref={this.fileInput} value={this.state.filename} onChange={this.handleFileChange}/> {this.state.uploaded}
          <h5>2. Select design</h5>
          <select value={this.state.design} onChange={this.handleDesignChange}>
            <option value=''>select a design</option>
            <option value="htwberlin">HTW Berlin</option>
          </select>
          <h5>3. Convert</h5>
          <input type="submit" value="Do!" />
        </form>
        {this.state.download}
      </div>
    );
  }
}

export default Home;

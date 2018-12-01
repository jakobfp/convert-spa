import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {uploaded: <FontAwesomeIcon icon="times" />, filename: "", download: ""};

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

    const data = new FormData();
    data.append('file', this.fileInput.current.files[0]);

    fetch('http://localhost:5000/api/upload', {
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
        this.setState({uploaded: `${response.error}`});
      }
    });
  }

  handleSubmit(event){
    fetch(`http://localhost:5000/api/convert?file=${this.state.uploaded_file_path}&design=${this.state.design}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === true){
        this.setState({download_url : `http://localhost:5000/api/download?file=${response.file_path}`})
        const link = document.createElement('a');
        link.href = this.state.download_url;
        link.setAttribute('download', response.file_name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log(response.error);
      }
    });
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
          <h5>3. Convert & Download</h5>
          <input type="submit" value="Do!" />
        </form>
      </div>
    );
  }
}

export default Home;

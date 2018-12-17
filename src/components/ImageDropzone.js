import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageDropzone extends Component {

  constructor(props){
    super(props);
    this.state = {
      files: [],
      rejected: []
    };
  }


  onDrop = async(acceptedFiles, rejectedFiles) => {
    await this.setState({files: [...this.state.files, ...acceptedFiles]});
    await this.setState({rejected: [...this.state.rejected, ...rejectedFiles]});
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/*, application/pdf"
            onDrop={this.onDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}  className="dropzone">
                <input {...getInputProps()} />
                <p>Try dropping some files here, or click to select files to upload.</p>
                <p>Only *.jpeg and *.png images will be accepted</p>
              </div>
            )}
          </Dropzone>
        </div>
        <aside>
          <p>Uploaded images</p>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default ImageDropzone;

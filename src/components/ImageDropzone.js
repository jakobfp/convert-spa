import React, { Component } from 'react';
import api from './api-config.js';

import Dropzone from 'react-dropzone';
const styled = require('styled-components').default;


const getColor = (props) => {
  if (props.isDragReject) {
      return '#c66';
  }
  if (props.isDragActive) {
      return '#6c6';
  }
  return '#666';
};

const Container = styled.div`
  font-size: 10px;
  padding: 5px;
  width: 200px;
  height: 50px;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
`;

const UploadedList = styled.ul`
  list-style-type: none;
  font-size: 10px;
  padding: 1px;
`;

const UploadedListElement = styled.li`
  margin: 1px 0 !important;
`;

class ImageDropzone extends Component {

  constructor(props){
    super(props);
    this.state = {
      rejected: []
    };
  }

  onDrop = async(acceptedFiles, rejectedFiles) => {
    await this.setState({rejected: [...this.state.rejected, ...rejectedFiles]});

    acceptedFiles.map((file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('path', this.props.uploaded_file_path);

      fetch(api.upload, {
        method: 'POST',
        body: data
      })
      .then(response => response.json())
      .then(response => {
        if(response.success === true){
          this.props.setImages(file);
        }
        else {
          this.props.setError(response.error);
        }
      });
      return 0;
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/*, application/pdf"
            onDrop={this.onDrop}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
            <Container
              isDragActive={isDragActive}
              isDragReject={isDragReject}
              {...getRootProps()}>
              <p>Drop images here...</p>
            </Container>
            )}
          </Dropzone>
        </div>
        <aside>
          <UploadedList>
            {
              this.props.images.map(f => <UploadedListElement key={f.name}>{f.name} - {f.size} bytes</UploadedListElement>)
            }
          </UploadedList>
        </aside>
      </section>
    );
  }
}

export default ImageDropzone;

import React, { Component } from 'react';
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
  width: 50px;
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
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
            <Container
              isDragActive={isDragActive}
              isDragReject={isDragReject}
              {...getRootProps()}>
            </Container>
            )}
          </Dropzone>
        </div>
        <aside>
          <UploadedList>
            {
              this.state.files.map(f => <UploadedListElement key={f.name}>{f.name} - {f.size} bytes</UploadedListElement>)
            }
          </UploadedList>
        </aside>
      </section>
    );
  }
}

export default ImageDropzone;

import React from 'react';
import { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const {SmallModal, Shade} = require('../../animation/EnterExit.js');

class AddImageModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      url: ""
    }

    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  componendDidMount(){
    this.setState({url: ""});
  }

  handleUrlChange(event){
    this.setState({url: event.target.value})
  }
  render() {

    return (
      <PoseGroup>
        {this.props.isVisible && [
          // If animating more than one child, each needs a `key`
          <Shade key="shade" className="shade" onClick={this.props.hideModal}/>,
          <SmallModal key="modal" className="modal">
            <div id="inputForm" className="urlForm">
              <div className="urlLabel">
                <label> Enter the URL of the image you want to add!</label>
              </div>
              <div className="urlInput">
                <input className="url" id="urlInput" type="text" name="url" placeholder="Image-URL" onChange={this.handleUrlChange}/>
              </div>
              <div className="urlButton" onClick={() => this.props.addImageUrl(this.state.url, this.props.col)}>
                <FontAwesomeIcon icon={faArrowRight} id="setUrlButton"/>
              </div>
            </div>
          </SmallModal>
        ]}
      </PoseGroup>
    );
  }
}


//
//<FontAwesomeIcon icon={faArrowRight} className="urlButton" id="setUrlButton" onClick={() => this.props.addImageUrl(this.state.url, this.props.col)}/>

export default AddImageModal;

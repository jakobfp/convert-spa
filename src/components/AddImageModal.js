import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../www/css/md.css';

const Modal = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 500, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 100,
    opacity: 0,
    delay: 0,
    transition: { duration: 150 }
  }
});

const Shade = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 1 } }
});

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
          <Modal key="modal" className="modal">
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
          </Modal>
        ]}
      </PoseGroup>
    );
  }
}


//
//<FontAwesomeIcon icon={faArrowRight} className="urlButton" id="setUrlButton" onClick={() => this.props.addImageUrl(this.state.url, this.props.col)}/>

export default AddImageModal;

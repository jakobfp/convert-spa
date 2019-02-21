import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';
import "../www/css/md.css"

import AddImageModal from "./AddImageModal.js"

class Slide extends Component {

  constructor(props){
    super(props);

    this.state = {
      id: this.props.currentSlide.id,
      title: this.props.currentSlide.title,
      split: this.props.currentSlide.split,
      col1: this.props.currentSlide.col1,
      col2: this.props.currentSlide.col2,
      showImageModal: false,
      imageAddIn: "col1"
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCol1Change = this.handleCol1Change.bind(this);
    this.handleCol2Change = this.handleCol2Change.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.newImage = this.newImage.bind(this);
    this.addImageUrl = this.addImageUrl.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.prepareSlide = this.prepareSlide.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  newImage(col){
    this.setState({showImageModal: true});
    this.setState({imageAddIn: col});
  }

  hideModal(){
    this.setState({showImageModal: false});
  }

  addImageUrl(url, coln){
    console.log(url, coln);
    if(coln === "col1")
      this.setState({col1: this.state.col1 + "\n\n![](" + url + ")\n\n"});
    else
      this.setState({col2: this.state.col2 + "\n\n![](" + url + ")\n\n"});
    this.hideModal();
  }

  handleCol1Change(event) {
    this.setState({col1: event.target.value});
  }

  handleCol2Change(event) {
    this.setState({col2: event.target.value});
  }

  toggleColumn(event) {
    if(this.state.split){
      this.setState({col2: ""});
    }
    this.setState({split: !(this.state.split)});
  }

  prepareSlide(event) {
    let slide = this.state;
    this.props.saveSlide(slide, this.state.id);
  }

  render() {
    return (
      <div id="slidecontent">
        <div id="addimagemodal">
          <AddImageModal isVisible={this.state.showImageModal} hideModal={this.hideModal} col={this.state.imageAddIn} addImageUrl={this.addImageUrl}/>
        </div>
        <label>Title</label><br/><input id="content-title" className="slidetitel" type="text" size="35" value={this.state.title} onChange={this.handleTitleChange}/>
        <br/>
        <label>Content</label> <br/>
        <table id="columns">
          <tbody>
            <tr>
              <td className="btn-td"><button className="htw-button" title="Add an image" id="image-col1" onClick={() => this.newImage("col1")}><FontAwesomeIcon icon={faImage} /></button></td>
              {this.state.split ?
              (<td className="btn-td"><button className="htw-button" title="Add an image" id="image-col2" onClick={() => this.newImage("col2")}><FontAwesomeIcon icon={faImage} /></button></td>) :
              (<td></td>)}
            </tr>
            <tr>
              <td><textarea className="slidecol" id="content-col1" value={this.state.col1} onChange={this.handleCol1Change}></textarea></td>
              {this.state.split ?
              (<td><textarea className="slidecol" id="content-col2" value={this.state.col2} onChange={this.handleCol2Change}></textarea></td>) :
              (<td><button className="htw-button" onClick={this.toggleColumn}>add column</button></td>)}
              {this.state.split ?
              (<td><button className="htw-button" onClick={this.toggleColumn}>remove column</button></td>) :
              (<td></td>)}
            </tr>
            <tr>
              <td className="btn-td"><FontAwesomeIcon title="Save changes" icon={faCheck} size="2x" className="icon-button" onClick={this.prepareSlide}/><FontAwesomeIcon title="Discard changes" icon={faTimes} size="2x" className="icon-button" onClick={this.props.cancelSlide}/><FontAwesomeIcon title="Delete slide" icon={faTrash} size="2x" className="icon-button" onClick={() => this.props.deleteSlide(this.state.id)}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Slide;

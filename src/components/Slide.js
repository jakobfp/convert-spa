import React, { Component } from "react";
import "../www/css/md.css"

class Slide extends Component {

  constructor(props){
    super(props);
    this.state = {
      title: "",
      split: false,
      col1: "",
      col2: ""
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCol1Change = this.handleCol1Change.bind(this);
    this.handleCol2Change = this.handleCol2Change.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
    this.prepareSlide = this.prepareSlide.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleCol1Change(event) {
    this.setState({col1: event.target.value});
  }

  handleCol2Change(event) {
    this.setState({col2: event.target.value});
  }

  toggleColumn(event) {
    this.setState({split: !(this.state.split)});
  }

  prepareSlide(event) {
    let slide = {"title": "\n ## " + this.state.title};
    var content = this.state.col1;
    if(this.state.split){
      content = `\\colA{6cm}\n\n${this.state.col1}\n\n\\colB{6cm}\n\n${this.state.col2}\n\n\\colEnd\n\n`;
    }
    slide.content = content;
    this.props.saveSlide(slide);
  }

  render() {
    return (
      <div id="slidecontent">
        <label>Title</label><br/><input id="content-title" className="slidetitel" type="text" size="35" value={this.state.title} onChange={this.handleTitleChange}/>
        <br/>
        <label>Content</label> <br/>
        <table id="columns">
          <tbody>
            <tr>
              <td><textarea className="slidecol" id="content-col1" value={this.state.col1} onChange={this.handleCol1Change}></textarea></td>
              {this.state.split ?
              (<td><textarea className="slidecol" id="content-col2" value={this.state.col2} onChange={this.handleCol2Change}></textarea></td>) :
              (<td><button className="addButton" onClick={this.toggleColumn}>add column</button></td>)}
              {this.state.split ?
              (<td><button className="addButton addButton--active" onClick={this.toggleColumn}>remove column</button></td>) :
              (<td></td>)}
            </tr>
          </tbody>
        </table>
        <div id="save">
          <button className="saveButton" onClick={this.prepareSlide}>Save</button>
        </div>
      </div>
    );
  }
}

export default Slide;

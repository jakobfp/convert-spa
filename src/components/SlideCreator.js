import React, { Component } from "react";
import "../www/css/md.css"

import Slide from "./Slide.js"
import TitleSlide from "./TitleSlide.js"

class SlideCreator extends Component {

  constructor(props){
    super(props);
    this.state = {
      slides: [],
      titleSlides: [],
      slideCount: 0,
      titleSlideCount: 0,
      newSlide: false,
      newTitleSlide: false,
      currentSlide: {}
    }

    this.saveSlide = this.saveSlide.bind(this);
    this.saveTitleSlide = this.saveTitleSlide.bind(this);
    this.newSlide = this.newSlide.bind(this);
    this.newTitleSlite = this.newTitleSlite.bind(this);
    this.editSlide = this.editSlide.bind(this);
  }

  saveSlide(slide){
    this.props.saveSlide(slide);
    let newCount = this.state.slideCount + 1;
    this.setState({slideCount: newCount});
    this.setState({slides: [...this.state.slides, slide]});
    this.setState({newSlide: false});
  }

  saveTitleSlide(slide){
    this.props.saveTitleSlide(slide);
    let newCount = this.state.titleSlideCount + 1;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [...this.state.titleSlides, slide]});
    this.setState({newTitleSlide: false});
  }

  newSlide(){
    this.setState({newSlide: true});
  }

  newTitleSlite(){
    this.setState({newTitleSlide: true});
  }

  editSlide(slide){
    this.setState({newTitleSlide: true});
    this.setState({newSlide: false});
    this.setState({currentSlide: slide});
  }

  render() {
    return (
      <div>
        <h2>Create a simple presentation</h2>
        <p>Add a title page and up to five slides! Click on them again to edit. <br/>Toggle the preview to check to generated Markdown text.</p>
        <br/>
        <div className="editor">
          {!(this.state.newSlide) ?
            this.state.newTitleSlide ?
              (<TitleSlide saveSlide={this.saveTitleSlide} currentSlide={this.state.currentSlide}/>) :
              (<button className="addButton addButton--added" onClick={this.newTitleSlite}>Titel page</button>)
             : (<p></p>)
          }
          {!(this.state.newTitleSlide) && this.state.slideCount < this.props.maxSlides ?
            this.state.newSlide ?
              (<Slide saveSlide={this.saveSlide} slide={this.state.currentSlide}/>) :
              (<button className="addButton addButton--added" onClick={this.newSlide}>Slide</button>)
             : (<p></p>)
          }
          {this.state.titleSlides.map((slide, slide_key) => {
            return (
              <div key={slide_key}>
                <button className="addButton addButton--edit" onClick={()=>{this.editSlide(slide)}}>title</button>
              </div>
            )
          })}
          {this.state.slides.map((slide, slide_key) => {
            return (
              <div key={slide_key}>
                <button className="addButton addButton--edit" onClick={this.newSlide}>{slide_key+1}</button>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}


export default SlideCreator;

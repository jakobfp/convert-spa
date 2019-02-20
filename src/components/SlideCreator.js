import React, { Component } from "react";

import "../www/css/md.css";

import Slide from "./Slide.js";
import TitleSlide from "./TitleSlide.js";

var _ = require('lodash');

var today = new Date();

class SlideCreator extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentSlide: {}
    }

    this.saveSlide = this.saveSlide.bind(this);
    this.saveTitleSlide = this.saveTitleSlide.bind(this);
    this.newSlide = this.newSlide.bind(this);
    this.newTitleSlite = this.newTitleSlite.bind(this);
    this.editTitleSlide = this.editTitleSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.selectSlide = this.selectSlide.bind(this);
    this.cancelSlide = this.cancelSlide.bind(this);
  }

  saveSlide(slide){
    this.props.saveSlide(slide);
    this.setState({currentSlide: {}});
  }

  editSlide(slide, idx){
    this.props.editSlide(slide, idx);
    this.setState({currentSlide: {}});
  }

  saveTitleSlide(slide){
    this.props.saveTitleSlide(slide);
    this.setState({currentSlide: {}});
  }

  editTitleSlide(slide){
    this.props.editTitleSlide(slide);
    this.setState({currentSlide: {}});
  }

  newSlide(){
    this.setState({currentSlide: {id:0, title:"", col1:"", col2:"", split:false}});
  }

  newTitleSlite(){
    this.setState({currentSlide: {id:0, title:"", subtitle:"", author:"", date:today}});
  }

  selectSlide(slide, slide_key){
    slide.id = slide_key;
    this.setState({currentSlide: slide});
  }

  cancelSlide(){
    this.setState({currentSlide: {}});
  }

  render() {

    let titleSlideExists = this.props.titleSlideCount >= this.props.maxTitleSlides;
    let allSlidesExists = this.props.slideCount >= this.props.maxSlides;

    let slideSelected = !(_.isEmpty(this.state.currentSlide));

    let slideType;
    if(slideSelected){
      slideType = _.has(this.state.currentSlide, 'author') ? "title" : "regular";
    }

    return (
      <div>
        <h2>Create a simple presentation</h2>
        <p>Add a title page and up to five slides! Click on them again to edit. <br/>Toggle the preview to check to generated Markdown text.</p>
        <div className="editor">
          {!(slideSelected) ?
            (<div id="slide-buttons">
              {!(titleSlideExists) ?
                  (<button className="addButton addButton--added" onClick={this.newTitleSlite}>Titel page</button>)
                 : (<div></div>)
              }

              {!(allSlidesExists) ?
                  (<button className="addButton addButton--added" onClick={this.newSlide}>Slide</button>)
                 : (<div></div>)
              }

              {this.props.titleSlides.map((slide, slide_key) => {
                return (
                  <div key={slide_key}>
                    <button className="addButton addButton--edit" onClick={() => this.selectSlide(slide, slide_key+1)}>titel</button>
                  </div>
                )
              })}

              {this.props.slides.map((slide, slide_key) => {
                return (
                  <div key={slide_key}>
                      <button className="addButton addButton--edit" onClick={() => this.selectSlide(slide, slide_key+1)}>{slide_key+1}</button>
                  </div>
                )
              })}
            </div>) :

            (<div id="slide-editor">
              {slideType === "title" ?
                titleSlideExists ?
                  (<TitleSlide saveSlide={this.editTitleSlide} cancelSlide={this.cancelSlide} currentSlide={this.state.currentSlide} />) :
                  (<TitleSlide saveSlide={this.saveTitleSlide} cancelSlide={this.cancelSlide} currentSlide={this.state.currentSlide} />)
                :
                this.state.currentSlide.id === 0 ?
                  (<Slide saveSlide={this.saveSlide} cancelSlide={this.cancelSlide} currentSlide={this.state.currentSlide} />) :
                  (<Slide saveSlide={this.editSlide} cancelSlide={this.cancelSlide} currentSlide={this.state.currentSlide} />)
              }
            </div>)
          }
        </div>
      </div>
    );
  }
}


export default SlideCreator;

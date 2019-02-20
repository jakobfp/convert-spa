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
    this.editTitleSlide = this.editTitleSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.selectSlide = this.selectSlide.bind(this);
  }

  saveSlide(slide){
    this.props.saveSlide(slide);
    let newCount = this.state.slideCount + 1;
    this.setState({slideCount: newCount});
    this.setState({slides: [...this.state.slides, slide]});
    this.setState({newSlide: false});
    this.setState({currentSlide: {}});
  }


  editSlide(slide, idx){
    this.props.editSlide(slide, idx);
    let slides = this.state.slides;
    slides[idx] = slide;
    this.setState({slides: slides});
    this.setState({newSlide: false});
    this.setState({currentSlide: {}});
  }

  saveTitleSlide(slide){
    this.props.saveTitleSlide(slide);
    let newCount = this.state.titleSlideCount + 1;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [...this.state.titleSlides, slide]});
    this.setState({newTitleSlide: false});
    this.setState({currentSlide: {}});
  }

  editTitleSlide(slide){
    this.props.editTitleSlide(slide);
    let newCount = this.props.maxTitleSlides;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [slide]});
    this.setState({newTitleSlide: false});
    this.setState({currentSlide: {}});
  }

  newSlide(){
    this.setState({currentSlide: {id:0, title:"", col1:"", col2:"", split:false}});
  }

  newTitleSlite(){
    this.setState({currentSlide: {id:0, title:"", subtitle:"", author:"", date:today}});
  }

  selectSlide(slide, slide_key){
    if(hasOwnProperty.call(slide, "author")){
      this.setState({newTitleSlide: true});
      this.setState({newSlide: false});
    } else {
      this.setState({newTitleSlide: false});
      this.setState({newSlide: false});
    }
    slide.id = slide_key;
    this.setState({currentSlide: slide});
  }

  render() {

    let titleSlideExists = this.state.titleSlideCount >= this.props.maxTitleSlides;
    let allSlidesExists = this.state.slideCount >= this.props.maxSlides;

    let slideSelected = !(_.isEmpty(this.state.currentSlide));

    let slideType;
    if(slideSelected){
      slideType = _.has(this.state.currentSlide, 'author') ? "title" : "regular";
    }

    return (
      <div>
        <h2>Create a simple presentation</h2>
        <p>Add a title page and up to five slides! Click on them again to edit. <br/>Toggle the preview to check to generated Markdown text.</p>
        <br/>
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

              {this.state.titleSlides.map((slide, slide_key) => {
                return (
                  <div key={slide_key}>
                    <button className="addButton addButton--edit" onClick={() => this.selectSlide(slide, slide_key+1)}>titel</button>
                  </div>
                )
              })}

              {this.state.slides.map((slide, slide_key) => {
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
                  (<TitleSlide saveSlide={this.editTitleSlide} currentSlide={this.state.currentSlide} />) :
                  (<TitleSlide saveSlide={this.saveTitleSlide} currentSlide={this.state.currentSlide} />)
                :
                this.state.currentSlide.id === 0 ?
                  (<Slide saveSlide={this.saveSlide} currentSlide={this.state.currentSlide} />) :
                  (<Slide saveSlide={this.editSlide} currentSlide={this.state.currentSlide} />)
              }
            </div>)
          }
        </div>
      </div>
    );
  }
}


export default SlideCreator;

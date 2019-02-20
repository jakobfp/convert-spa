import React, { Component } from "react";
import "../www/css/md.css"

import Preview from "./Preview.js"
import SlideCreator from "./SlideCreator.js"


class MarkdownToBeamerHeader extends Component {

  render() {
    return (
      <div>
        <h2>How to use Markdown to create PDF slides</h2>
        <p>
          Use this tool to create a simple and short presentation in HTW Berlin design! No need for downloading PowerPoint-templates and struggle with those!<br/>
          Learn here how to write in Markdown and convert it to PDF slides.
        </p>
      </div>
    );
  }
}


class MarkdownToBeamer extends Component {

  constructor(props){
    super(props);
    this.state = {
      maxSlides: 5,
      maxTitleSlide: 1,
      slides: [],
      titleSlides: [],
      slideCount: 0,
      titleSlideCount: 0,
      togglePreview: false,
      togglePreviewArrow: <div className="arrow-down"></div>
    }
    this.saveSlide = this.saveSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.saveTitleSlide = this.saveTitleSlide.bind(this);
    this.editTitleSlide = this.editTitleSlide.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }


  saveSlide(slide){
    let newCount = this.state.slideCount + 1;
    this.setState({slideCount: newCount});
    this.setState({slides: [...this.state.slides, slide]});
  }

  editSlide(slide, idx){
    let slides = this.state.slides;
    slides[idx] = slide;
    this.setState({slides: slides});
  }

  saveTitleSlide(slide){
    let newCount = this.state.titleSlideCount + 1;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [...this.state.titleSlides, slide]});
  }

  editTitleSlide(slide){
    let newCount = this.props.maxTitleSlides;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [slide]});
  }


  togglePreview(event){
    this.setState({togglePreview: !(this.state.togglePreview)});
    if(!(this.state.togglePreview))
      this.setState({togglePreviewArrow: <div className="arrow-down active"></div>})
    else
      this.setState({togglePreviewArrow: <div className="arrow-down"></div>})
  }

  render() {
    return (
      <div>
        <div className="content-mul">
          <div className="slidecreator">
            <SlideCreator
              maxSlides={this.state.maxSlides}
              maxTitleSlides={this.state.maxTitleSlide}
              slideCount={this.state.slideCount}
              titleSlideCount={this.state.titleSlideCount}
              saveSlide={this.saveSlide}
              saveTitleSlide={this.saveTitleSlide}
              editSlide={this.editSlide}
              editTitleSlide={this.editTitleSlide}
              slide={this.state.slides}
              titleSlides={this.state.titleSlides}
            />
          </div>
        </div>
        <div onClick={this.togglePreview}>{this.state.togglePreviewArrow}</div>
        {this.state.togglePreview ?
          (<div className="content-mul">
            <h2>Markdown - Preview</h2>
            <Preview
              slides={this.state.slides}
              titleSlides={this.state.titleSlides}
            />
          </div>) : (<p></p>)
        }
      </div>
    );
  }
}

export {MarkdownToBeamer, MarkdownToBeamerHeader};

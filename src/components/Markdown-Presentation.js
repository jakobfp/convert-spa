import React, { Component } from "react";
import api from './api-config.js';
import "../www/css/md.css";

import {Preview, FormatDate} from "./Preview.js";
import SlideCreator from "./SlideCreator.js";

const open_file = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
      maxTitleSlides: 1,
      slides: [],
      titleSlides: [],
      slideCount: 0,
      titleSlideCount: 0,
      togglePreview: false,
      togglePreviewArrow: <div className="arrow-down"></div>
    }
    this.saveSlide = this.saveSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);

    this.saveTitleSlide = this.saveTitleSlide.bind(this);
    this.editTitleSlide = this.editTitleSlide.bind(this);
    this.deleteTitleSlide = this.deleteTitleSlide.bind(this);

    this.togglePreview = this.togglePreview.bind(this);

    this.savePresentation = this.savePresentation.bind(this);
  }


  saveSlide(slide){
    let newCount = this.state.slideCount + 1;
    this.setState({slideCount: newCount});
    this.setState({slides: [...this.state.slides, slide]});
  }

  editSlide(slide, idx){
    let slides = this.state.slides;
    slides[idx-1] = slide;
    this.setState({slides: slides});
  }

  deleteSlide(idx){
    let slides = this.state.slides;
    slides.splice(idx-1, 1);
    this.setState({slides: slides});
  }

  saveTitleSlide(slide){
    let newCount = this.state.titleSlideCount + 1;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [...this.state.titleSlides, slide]});
  }

  editTitleSlide(slide){
    let newCount = this.state.maxTitleSlides;
    this.setState({titleSlideCount: newCount});
    this.setState({titleSlides: [slide]});
  }

  deleteTitleSlide(){
    this.setState({titleSlideCount: 0});
    this.setState({titleSlides: []});
  }

  savePresentation(){
    let titleSlides = this.state.titleSlides.map((slide, key) => {
      return {
        title: slide.title,
        subtitle: slide.subtitle,
        author: slide.author,
        date: FormatDate(slide.date, "/")
      }
    });

    fetch(api.c_markdown, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"slides": this.state.slides, "titleSlides": titleSlides})
    })
    .then(response => response.json())
    .then(response => {
      if(response.success === true){
        console.log(response);
        const downloadParams = `file=${response.file_path}`;
        open_file(api.download+downloadParams);
      }
      else {
        console.log(response);
      }
    });
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
              maxTitleSlides={this.state.maxTitleSlides}
              slideCount={this.state.slideCount}
              titleSlideCount={this.state.titleSlideCount}
              saveSlide={this.saveSlide}
              editSlide={this.editSlide}
              deleteSlide={this.deleteSlide}
              saveTitleSlide={this.saveTitleSlide}
              editTitleSlide={this.editTitleSlide}
              deleteTitleSlide={this.deleteTitleSlide}
              slides={this.state.slides}
              titleSlides={this.state.titleSlides}
            />
          </div>
          <br/>
          <div id="savePresentationButton">
            <button onClick={this.savePresentation}>Create Presentation</button>
          </div>
        </div>
        <div id="previewToggleArrow" onClick={this.togglePreview}>{this.state.togglePreviewArrow}</div>
        <Preview
          slides={this.state.slides}
          titleSlides={this.state.titleSlides}
          pose={this.state.togglePreview ? 'enter' : 'exit'}
        />
      </div>
    );
  }
}

export {MarkdownToBeamer, MarkdownToBeamerHeader};

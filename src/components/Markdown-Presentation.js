import React, { Component } from "react";
import api from './api-config.js';
import "../www/css/md.css";

import {Preview, FormatDate} from "./Preview.js";
import {Circle} from 'better-react-spinkit';
import SlideCreator from "./SlideCreator.js";
import MarkdownTutorial from "./MarkdownTutorial.js";
import { PoseGroup } from 'react-pose';

const {Modal, Shade} = require('./animation/EnterExit.js');

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
          It is designed to motivate you to learn basic markdown syntax for the future!
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
      toggleHelp: false,
      togglePreviewArrow: <div className="arrow-down"></div>,
      isLoading: false
    }
    this.saveSlide = this.saveSlide.bind(this);
    this.editSlide = this.editSlide.bind(this);
    this.deleteSlide = this.deleteSlide.bind(this);

    this.saveTitleSlide = this.saveTitleSlide.bind(this);
    this.editTitleSlide = this.editTitleSlide.bind(this);
    this.deleteTitleSlide = this.deleteTitleSlide.bind(this);

    this.togglePreview = this.togglePreview.bind(this);
    this.toggleHelpChange = this.toggleHelpChange.bind(this);

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
    let newCount = this.state.slideCount - 1;
    this.setState({slideCount: newCount});
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
    this.setState({isLoading: true});
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
        this.setState({isLoading: false});
      }
      else {
        console.log(response);
        this.setState({isLoading: false});
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

  toggleHelpChange(event){
    this.setState({toggleHelp: !(this.state.toggleHelp)});
  }

  render() {
    return (
      <div id="create-presentation-wrapper">
        {this.state.isLoading ? (<div id="loading-spinner"><div className="center-circle"><Circle size={100}/></div></div>) : (<div></div>)}
        <button onClick={this.toggleHelpChange} className="htw-button">Show help</button>
        <PoseGroup>
          {this.state.toggleHelp && [
            // If animating more than one child, each needs a `key`
            <Shade key="shade" className="shade" onClick={this.toggleHelpChange}/>,
            <Modal key="modal" className="modal">
              <div className="tut-wrap">
                <MarkdownTutorial />
              </div>
            </Modal>
          ]}
        </PoseGroup>
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
            <button className="create-button" title="Will create and download the presentation" onClick={this.savePresentation}>Create Presentation</button>
          </div>
        </div>
        <div id="previewToggleArrow" onClick={this.togglePreview}>{this.state.togglePreviewArrow}</div>
        <PoseGroup>
          <Preview
            key="preview"
            slides={this.state.slides}
            titleSlides={this.state.titleSlides}
            pose={this.state.togglePreview ? 'enter' : 'exit'}
          />
        </PoseGroup>
      </div>
    );
  }
}

export {MarkdownToBeamer, MarkdownToBeamerHeader};

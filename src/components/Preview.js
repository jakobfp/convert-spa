import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';

import "../www/css/md.css"

const {AnimatedWrapper} = require('./animation/EnterExit.js');

const FormatDate = (date, sep) => {
  let d = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
  let m = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  return d + sep + m + sep + date.getFullYear();
}

const RawPreview = ({titleSlides, slides, pose}) => (
  <AnimatedWrapper id="raw-preview-wrapper" pose={pose} className="content-mul">
    <h2>Raw - Preview</h2>
    {titleSlides.map((slide, index) => {
      return (
        <div key={index} id={index+"t"}>
          <p>
            ---<br/>
            title: {slide.title}<br/>
            subtitle: {slide.subtitle}<br/>
            author: {slide.author}<br/>
            date: {FormatDate(slide.date, "/")}<br/>
            ---
          </p>
        </div>
      )
    })}

    {slides.map((slide, index) => {
      return (
        <div key={index} id={index+"s"}>
          {slide.title}
          <p>
            {slide.content.split('\n').map((item, key) => {
              return <React.Fragment key={key}>{item}<br/></React.Fragment>
            })}
          </p>
        </div>
      )
    })}
  </AnimatedWrapper>
);
// <MarkdownPreview id="rmarkdown-preview" pose={this.props.pose} source={markdownString.join('')}/>

const MarkdownPreview = ({pose, source}) => (
  <AnimatedWrapper id="markdown-preview-wrapper" pose={pose} className="content-mul">
    <h2>Converted - Preview</h2>
    <ReactMarkdown source={source}/>
  </AnimatedWrapper>
);

class Preview extends Component {
  render() {
    const formattedSlides = this.props.slides.map((slide, key) => {
      let formattedSlide = {"title": "\n ## " + slide.title};
      var content = slide.col1;
      if(slide.split){
        content = `\\colA{6cm}\n\n${slide.col1}\n\n\\colB{6cm}\n\n${slide.col2}\n\n\\colEnd\n`;
      }
      formattedSlide.content = content;
      return formattedSlide;
    });
    const markdownString = formattedSlides.map((slide, key) => {
      let string = "\n## " + slide.title + "\n" + slide.content + "\n";
      return string;
    });
    return (
      <div id="preview-wrapper">
        <RawPreview id="raw-preview" pose={this.props.pose} titleSlides={this.props.titleSlides} slides={formattedSlides} />
      </div>
    );
  }
}

export {Preview, FormatDate};

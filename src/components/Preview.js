import React, { Component } from "react";
import posed from 'react-pose';
import "../www/css/md.css"

const FormatDate = (date, sep) => {
  let d = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
  let m = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  return d + sep + m + sep + date.getFullYear();
}

const PreviewListWrapper = posed.div({
  enter: {opacity: 1},
  exit: {opacity: 0}
});

const PreviewList = ({titleSlides, slides, pose}) => (
  <PreviewListWrapper pose={pose} className="content-mul">
    <h2>Markdown - Preview</h2>
    {titleSlides.map((slide, slide_key) => {
      return (
        <div key={slide_key}>
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

    {slides.map((slide, slide_key) => {
      return (
        <div key={slide_key}>
          {slide.title}
          <p>
            {slide.content.split('\n').map((item, key) => {
              return <React.Fragment key={key}>{item}<br/></React.Fragment>
            })}
          </p>
        </div>
      )
    })}
  </PreviewListWrapper>
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
    })
    return (
      <PreviewList pose={this.props.pose} titleSlides={this.props.titleSlides} slides={formattedSlides} />
    );
  }
}

export {Preview, FormatDate};
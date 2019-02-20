import React, { Component } from "react";
import "../www/css/md.css"

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
      <div id="output">
        {this.props.titleSlides.map((slide, slide_key) => {
          return (
            <div key={slide_key}>
              <p>
                ---<br/>
                title: {slide.title}<br/>
                subtitle: {slide.subtitle}<br/>
                author: {slide.author}<br/>
                date: {slide.date.toJSON().slice(0,10).replace(/-/g,'/')}<br/>
                ---
              </p>
            </div>
          )
        })}
        {formattedSlides.map((slide, slide_key) => {
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
      </div>
    );
  }
}

export default Preview;

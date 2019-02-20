import React, { Component } from "react";
import "../www/css/md.css"

class Preview extends Component {
  render() {
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
        {this.props.slides.map((slide, slide_key) => {
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

import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import { PoseGroup } from 'react-pose'
import "../www/css/md.css"

const {AnimatedWrapper, FromTheSide} = require('./animation/EnterExit.js');

const MarkdownPreview = ({source}) => (
  <ReactMarkdown source={source}/>
);

const RawPreview = ({pose, source}) => (
  <AnimatedWrapper id="markdown-preview-wrapper" pose={pose}>
    <div id="rawTut">{source}</div>
  </AnimatedWrapper>
);

class MarkdownTutorial extends Component {

  constructor(props){
    super(props);
    this.state = {
      source: "## Basic Markdown Syntax\n\n *Kursiv* wir geschrieben, was zwischen zwei \* steht.\n\n**Fett** wird geschrieben was zwischen doppel-\*\* steht.\n\n### Liste\n\n* Punkt1\n* Punkt2\n  * Unterpunkt1\n\n### Tabelle:\n\n| Feature   | Support |\n| --------- | ------ |\n| tables    | ✔ |\n| alignment | ✔ |\n| wewt      | ✔ |",
      togglePreview: false
    }
    this.changePreview = this.changePreview.bind(this);
  }

  changePreview(){
    this.setState({togglePreview: !(this.state.togglePreview)});
  }

  render() {
    let rawPose = this.state.togglePreview ? 'enter' : 'exit';
    let markdownPose = this.state.togglePreview ? 'exit' : 'enter';
    return (
      <div id="tutorial-wrapper" className="content-mul" onClick={this.changePreview}>
        <PoseGroup>
          <div id="markdown" key="md-div">
            <MarkdownPreview key="markdown-preview" source={this.state.source}/>
          </div>
          <div id="raw" key="raw-div">
            <RawPreview key="raw-preview" pose={rawPose} source={this.state.source}/>
          </div>
        </PoseGroup>
      </div>
    );
  }
}

export default MarkdownTutorial;

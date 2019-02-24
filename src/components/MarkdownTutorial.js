import React, { Component } from "react";
import ReactMarkdown from 'react-markdown';
import "../www/css/md.css"

const MarkdownPreview = ({source}) => (
  <div id="markdown">
    <ReactMarkdown source={source}/>
  </div>
);

const RawPreview = ({pose, source, onSourceChange}) => (
  <div id="raw">
    <p>Play around with Markdown and check the changes.</p>
    <textarea id="rawTut" onChange={onSourceChange} value={source}></textarea>
  </div>
);

class MarkdownTutorial extends Component {

  constructor(props){
    super(props);
    this.state = {
      source: "## Basic Markdown Syntax\n\n*Kursiv* wir geschrieben, was zwischen zwei \* steht.\n\n**Fett** wird geschrieben was zwischen doppel-\*\* steht.\n\n### Liste\n\n* Punkt1\n* Punkt2\n  * Unterpunkt1\n\n### Tabelle:\n\n| Feature   | Support |\n| --------- | ------ |\n| tables    | ✔ |\n| alignment | ✔ |"
    }
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  handleSourceChange(event) {
    this.setState({source: event.target.value});
  }

  render() {
    return (
      <div id="tutorial-wrapper" className="content-mul">
        <h2>Help</h2>
        <div id="raw-wrap" key="raw-div">
          <RawPreview key="raw-preview" source={this.state.source} onSourceChange={this.handleSourceChange}/>
        </div>
        <div id="markdown-wrap" key="md-div">
          <p>Output:</p>
          <MarkdownPreview key="markdown-preview" source={this.state.source}/>
        </div>
      </div>
    );
  }
}

export default MarkdownTutorial;

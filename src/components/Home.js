import React, { Component } from "react";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {design: '', files: []}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDesignChange = this.handleDesignChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleSubmit(event){
        console.log(this.state.design);
        console.log(this.state.file);
    }

    handleDesignChange(event){
        this.setState({value: event.target.value});
        this.state.design = event.target.value;
    }

    handleFileChange(event){
        this.setState({value: event.target.value});
        this.state.file = event.target.value;
    }

    render() {
        return (
            <div>
                <h2>HELLO</h2>
                <p>With this Application you can convert Latex articles and presentations as well as Word documents in the corporate design of HTW Berlin.</p>
                <form onSubmit={this.handleSubmit}>
                    <h5>1. Upload file</h5>
                    <input type="file" valie={this.state.file} onChange={this.handleFileChange}/>
                    <h5>2. Select design</h5>
                    <select value={this.state.design} onChange={this.handleDesignChange}>
                        <option value="htwberlin">HTW Berlin</option>
                        <option value="empty">Empty</option>
                    </select>
                    <h5>3. Convert & Download</h5>
                    <input type="submit" value="Do!" />
                </form>
            </div>
        );
    }
}

export default Home;

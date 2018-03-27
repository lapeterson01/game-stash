import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        };
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.postGame(this.state.file).then((response) => {
            console.log(response);
        })
    }

    onFileChange = (event) => {
        this.setState({ file: event.target.files[0] });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <input type="file" onChange={this.onFileChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
};

export default connect(null, actions)(Upload);
import React, { Component } from 'react';
import './Loading.css'

class Loading extends Component {
    render() {
        return (
            <div className="d-flex h-100 justify-content-center align-items-center">
                <div className="spinner-border Loading-SpinnerBorder text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default Loading;
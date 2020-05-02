import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NotFoundView extends Component {
    render() {
        return (
            <div class="h1 text-center NotFoundView-message">
                URL Not Found
            </div>
        )
    }
}

export default NotFoundView;
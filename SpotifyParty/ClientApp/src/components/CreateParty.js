import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class CreateParty extends Component {
    static displayName = CreateParty.name;

    constructor(props) {
        super(props);
        this.state = { name: '', summary: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let val = event.target.id;
        if (val === 'name') {
            this.setState({ name: event.target.value });
        } else {
            this.setState({ summary: event.target.value });
        }
    }

    handleSubmit(event) {
        fetch('api/Party', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.state)
        }).then(response => {
            this.setState({ partyName: '', partySummary: '' });
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Party Name</Label>
                        <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="summary">Party Summary</Label>
                        <Input type="textarea" name="summary" id="summary" value={this.state.summary} onChange={this.handleChange} />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}

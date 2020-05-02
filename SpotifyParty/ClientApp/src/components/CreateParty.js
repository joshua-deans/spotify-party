import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './CreateParty.css';

class CreateParty extends Component {
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
            body: JSON.stringify({ ...this.state, userId: this.props.user.userId })
        }).then(response => {
            if (response && response.status === 200) {
                window.location.href = "/";
            }
            this.setState({ partyName: '', partySummary: '' });
        }).catch(err => {
            this.setState({ partyName: '', partySummary: '' });
        });
        event.preventDefault();
    }

    render() {
        if (!this.props.isLoggedIn && this.props.isAuthLoaded) {
            return <Redirect to='/' />;
        } 
        return (
            <div className="CreateParty-container">
                <h3 className="text-center">Create A Party</h3>
            <div className="card CreateParty-card">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Party Name</Label>
                        <input className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="summary">Party Summary</Label>
                        <input className="form-control" type="textarea" name="summary" id="summary" value={this.state.summary} onChange={this.handleChange} />
                    </FormGroup>
                   <Button color="primary">Submit</Button>
                </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    isAuthLoaded: state.auth.isAuthLoaded, 
    user: state.auth.user

});

export default connect(mapStateToProps)(CreateParty);
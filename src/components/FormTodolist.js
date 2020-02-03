import React, { Component } from 'react';
import shortid from 'shortid';
export default class FormTodolist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todolist: ''
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log({ [e.target.name]: e.target.value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit({
			id: shortid.generate(),
			todolist: this.state.todolist,
			complete: false
		});

		this.setState({
			todolist: ''
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						name='todolist'
						value={this.state.todolist}
						onChange={this.handleChange}
						placeholder='what needs to be done...'
					/>
				</form>
			</div>
		);
	}
}

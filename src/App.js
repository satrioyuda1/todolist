import React, { Component } from 'react';
import FormTodolist from './components/FormTodolist';
import ToDo from './components/ToDo';
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [],
			todoShow: 'all',
			toggleComplete: true
		};
	}

	addTodo = (todo) => {
		this.setState({
			todos: [ todo, ...this.state.todos ]
		});
	};

	toggleDone = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					return {
						...todo,
						complete: !todo.complete
					};
				} else {
					return todo;
				}
			})
		});
	};
	updateTodoToShow = (s) => {
		this.setState({
			todoShow: s
		});
	};

	deleteTodo = (id) => {
		this.setState((state) => ({
			todos: state.todos.filter((todo) => todo.id !== id)
		}));
	};
	removeAllComplete = () => {
		this.setState((state) => ({
			todos: state.todos.filter((todo) => !todo.complete)
		}));
	};
	toggleCompleteAll = () => {
		this.setState({
			todos: this.state.todos.map((todo) => ({
				...todo,
				complete: this.state.toggleComplete
			})),
			toggleComplete: !this.state.toggleComplete
		});
	};

	componentDidMount() {
		const todos = JSON.parse(localStorage.getItem('todos'));
		this.setState({ todos: [ ...this.state.todos ] });
	}

	componentDidUpdate(nextProps, nextState) {
		localStorage.setItem('todos', JSON.stringify(this.state.todos));
		console.log(this.state.todos.filter((todo) => todo.complete).length);
	}
	render() {
		// this.todos = JSON.parse(localStorage.getItem('todos'));

		let todos = [];

		if (this.state.todoShow === 'all') {
			todos = this.state.todos;
		} else if (this.state.todoShow === 'active') {
			todos = this.state.todos.filter((todo) => !todo.complete);
		} else if (this.state.todoShow === 'complete') {
			todos = this.state.todos.filter((todo) => todo.complete);
		}

		return (
			<div className='App'>
				<FormTodolist onSubmit={this.addTodo} />
				{todos.map((todo) => (
					<ToDo
						key={todo.id}
						toggleDone={() => this.toggleDone(todo.id)}
						todo={todo}
						onDelete={() => this.deleteTodo(todo.id)}
					/>
				))}
				<div>todos left :{this.state.todos.filter((todo) => !todo.complete).length}</div>
				<div>
					<button onClick={() => this.updateTodoToShow('all')}>all</button>
					<button onClick={() => this.updateTodoToShow('active')}>active</button>
					<button onClick={() => this.updateTodoToShow('complete')}>complete</button>
					{this.state.todos.filter((todo) => todo.complete).length ? (
						<button onClick={this.removeAllComplete}>Remove All Complete</button>
					) : null}
					<button onClick={this.toggleCompleteAll}>All Complete :{`${this.state.toggleComplete}`}</button>
				</div>
			</div>
		);
	}
}

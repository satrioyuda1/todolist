import React from 'react';

export default (props) => (
	<div style={{ display: 'flex' }}>
		<div style={{ textDecoration: props.todo.complete ? 'line-through' : '' }} onClick={props.toggleDone}>
			{props.todo.todolist}
		</div>
		<input type='checkbox' onClick={props.toggleDone} />
		<button onClick={props.onDelete}>x</button>
	</div>
);

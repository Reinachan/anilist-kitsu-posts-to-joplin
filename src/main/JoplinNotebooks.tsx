import React from 'react';
import NotebookIDs from './NotebookIDs';

import '../styles/main/notebooks.scss';

interface notebookConstructor {
	notebook: any[];
	value: string;
}

export default class JoplinNotebooks extends React.Component<{}, notebookConstructor> {
	constructor(props: any) {
		super(props);
		this.state = {
			notebook: [],
			value: '41184',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event: any) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event: any) {
		let joplinPort: string = this.state.value;

		fetch(`http://localhost:${joplinPort}/folders`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				data = data.items;
				this.setState({ notebook: data });
			});

		event.preventDefault();
	}

	render() {
		return (
			<form className='list-notebooks' onSubmit={this.handleSubmit}>
				<fieldset>
					<div className='legend'>
						<legend className='section-header'>
							<span>All Notebooks</span>
						</legend>
					</div>
					<div className='notebook-group'>
						<label htmlFor='joplin-port' className='field-label'>
							Joplin port
						</label>
						<input
							name='joplinPort'
							type='text'
							id='joplin-port'
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<p>Requires Joplin to be running</p>
						<input
							name='submit'
							type='submit'
							value='Get all notebook IDs'
							id='fetch-notebook-id'
						/>
					</div>
					<div>
						<div className='show-notebooks'>
							{this.state.notebook.map((notebook: any) => (
								<NotebookIDs notebook={notebook} />
							))}
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}

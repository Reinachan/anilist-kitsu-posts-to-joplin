import React from 'react';

interface notebook {
	notebook: any;
}

export default function NotebookIDs(props: notebook) {
	return (
		<div className='notebook'>
			<div className='individual-notes' key={props.notebook.id}>
				<h3>{props.notebook.title}</h3>
				<p>{props.notebook.id}</p>
			</div>
		</div>
	);
}

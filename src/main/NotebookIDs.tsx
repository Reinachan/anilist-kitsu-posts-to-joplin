import React from 'react';

interface notebook {
	notebook: any;
}

export default function NotebookIDs(props: notebook) {
	return (
		<div className='notebook' key={props.notebook.id}>
			<div className='individual-notes'>
				<h3>{props.notebook.title}</h3>
				<p>{props.notebook.id}</p>
			</div>
		</div>
	);
}

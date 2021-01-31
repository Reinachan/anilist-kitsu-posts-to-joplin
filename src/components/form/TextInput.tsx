import React, { ReactElement } from 'react';

interface Props {
	name: string;
	placeholder?: string;
	label: string;
	small: any;
	input?: any;
}

export default function TextInput({
	name,
	placeholder,
	label,
	small,
	input,
}: Props): ReactElement {
	return (
		<div className='field-group'>
			<label htmlFor={name} className='field-label'>
				{label}
			</label>
			<input
				id={name}
				name={name}
				type='text'
				className='field-input'
				placeholder={placeholder}
				defaultValue={input}
				onChange={(event) => input(event.target.value)}
			/>
			<small className='field-description'>{small}</small>
		</div>
	);
}

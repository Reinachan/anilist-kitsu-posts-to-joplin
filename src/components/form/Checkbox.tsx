import react, { ReactElement } from 'react';

interface Props {
	name: string;
	label: string;
	small: any;
	input: any;
	checked: boolean;
}

export default function Checkbox({
	name,
	label,
	small,
	input,
	checked,
}: Props): ReactElement {
	return (
		<>
			<input
				id={name}
				name={name}
				className='checkbox'
				type='checkbox'
				checked={checked}
				onChange={(event) => input(event.target.checked)}
			/>
			<label className='field-label'>{label}</label>
			<small className='field-description'>{small}</small>
		</>
	);
}

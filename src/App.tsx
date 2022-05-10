import {FormEventHandler, useState} from 'react';
import {getQuery, removeFromNow} from './utils';

export function App() {
	const hoursAgo = getQuery('hours');

	const [input, setInput] = useState<string>(
		hoursAgo ? removeFromNow(hoursAgo) : '',
	);

	const hoursOnInput: FormEventHandler<HTMLSelectElement> = event => {
		const {value} = event.currentTarget;

		setInput(removeFromNow(value));
	};

	return (
		<main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
			<h1>How many Hours ago?</h1>
			<select value={hoursAgo ?? ''} onInput={hoursOnInput}>
				{Array.from({length: 25}, (_value, index) => (
					<option key={index} value={index}>
						{index}
					</option>
				))}
			</select>

			<p>{input}</p>

			<footer className="text-cyan-500">Eliaz Bobadilla</footer>
		</main>
	);
}

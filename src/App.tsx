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

		const parameters = new URLSearchParams(location.search);

		parameters.set('hour', value);

		const newRelativePathQuery = location.pathname + '?' + parameters.toString();

		history.pushState(null, '', newRelativePathQuery);
	};

	return (
		<main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
			<h1 className="underline bold title-case text-purple-800">
        How many Hours ago?
			</h1>

			<select onInput={hoursOnInput}>
				{Array.from({length: 24}, (_value, index) => {
					console.log(index + 1);

					const value = index + 1;

					return (
						<option key={value} value={value}>
							{value}
						</option>
					);
				})}
			</select>

			<p>{input}</p>

			<p className="text-xl text-gray-200">
        Has anyone ever told you they were going to sleep but kept posting stuff
        online afterwards?
				<br />
				<br />
        Want to see what time their last post was, but X platform only says how
        many hours ago it was? This site is for you!
			</p>

			<footer className="text-cyan-500">Eliaz Bobadilla</footer>
		</main>
	);
}

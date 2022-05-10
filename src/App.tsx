import {FormEventHandler, useEffect, useState} from 'react';
import {getQuery, removeFromNow} from './utils';

export interface Language {
	lang: 'string';
	title: 'string';
	body: 'string';
}

export function App() {
	const hoursAgo = getQuery('hours');

	const [input, setInput] = useState(
		hoursAgo ? removeFromNow(hoursAgo) : removeFromNow(),
	);

	const [language, setLanguage] = useState<string>('English');
	const [languageList, setLanguageList] = useState<Array<Language['title']>>();
	const [languageData, setLanguageData] = useState<Language>();

	async function fetchLanguages() {
		const response = await fetch('./lang.json');

		/* eslint @typescript-eslint/no-unsafe-assignment: off */
		const data: Language[] = await response.json();

		setLanguageData(data.find(lang => lang.lang === language));

		setLanguageList(data.map(lang => lang.lang));
	}

	useEffect(() => {
		/* eslint @typescript-eslint/no-floating-promises: off */
		fetchLanguages();
	}, [language, setLanguage]);

	const onLanguageInput: FormEventHandler<HTMLSelectElement> = event => {
		const {value} = event.currentTarget;

		setLanguage(value);

		/* eslint @typescript-eslint/no-floating-promises: off */
		fetchLanguages();
	};

	const hoursOnInput: FormEventHandler<HTMLSelectElement> = event => {
		const {value} = event.currentTarget;

		setInput(removeFromNow(value));

		const parameters = new URLSearchParams(location.search);

		parameters.set('hour', value);

		const newRelativePathQuery = location.pathname + '?'
      + parameters.toString();

		history.pushState(null, '', newRelativePathQuery);
	};

	if (!languageData) {
		console.log(languageData);
		return <p>Loading...</p>;
	}

	return (
		<main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
			<h1 className="underline bold title-case text-purple-800">
				{languageData.title}
			</h1>

			<select onInput={hoursOnInput}>
				{Array.from({length: 24}, (_value, index) => {
					const value = index + 1;

					return (
						<option key={value} value={value}>
							{value}
						</option>
					);
				})}
			</select>

			<p>{input.toLocaleString()}</p>

			<p className="text-xl text-gray-200">{languageData.body}</p>

			<section>
				<p>Language</p>

				<select onInput={onLanguageInput}>
					{languageList?.map(lang => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
			</section>

			<footer className="text-cyan-500">Eliaz Bobadilla</footer>
		</main>
	);
}

import {FormEventHandler, useEffect, useState} from 'react';
import {fethText, getQuery, pushQuery, removeFromNow} from './utils';

import {Language} from './types';
import {LanguageSwitch} from './LanguageSwitch';
import {HoursInput} from './24HoursInput';

export function App() {
	const hoursAgo = getQuery('hour');

	const [input, setInput] = useState(
		hoursAgo ? removeFromNow(hoursAgo) : removeFromNow(),
	);

	const [language, setLanguage] = useState('English');

	const [languageList, setLanguageList] = useState<Array<Language['title']>>();
	const [languageData, setLanguageData] = useState<Language>();

	async function fetchLanguages() {
		const data = await fethText();

		setLanguageData(data.find(lang => lang.lang === language));
		setLanguageList(data.map(lang => lang.lang));
	}

	useEffect(() => {
		void fetchLanguages();
	}, [language, setLanguage]);

	const onLanguageInput: FormEventHandler<HTMLSelectElement> = event => {
		const {value} = event.currentTarget;

		setLanguage(value);

		void fetchLanguages();
	};

	const hoursOnInput: FormEventHandler<HTMLSelectElement> = ({
		currentTarget: {value},
	}) => {
		setInput(removeFromNow(value));
		pushQuery('hour', value);
	};

	if (!languageData || !languageList) {
		return <p>Loading...</p>;
	}

	return (
		<main className="bg-slate-600 flex flex-col p-5 h-screen gap-4 text-2xl text-center">
			<h1 className="underline bold title-case text-purple-800">
				{languageData.title}
			</h1>

			<p>{input.toLocaleString()}</p>

			<HoursInput handler={hoursOnInput} />

			<LanguageSwitch handler={onLanguageInput} languageList={languageList} />

			<p className="text-xl text-gray-200">{languageData.body}</p>

			<footer className="text-cyan-500">Eliaz Bobadilla</footer>
		</main>
	);
}

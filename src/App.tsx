import {useEffect, useState} from 'react';

import {
	fethText,
	getQuery,
	pushQuery,
	removeFromNow,
	timeZone,
} from './utils';

import {LanguageSwitch} from './LanguageSwitch';
import {TimeZoneSwitch} from './TimeZoneSwitch';
import {HoursInput} from './24HoursInput';

import {Language, SwitchInput} from './types';
import {Footer} from './footer';

const hoursAgo = getQuery('hour');

export function App() {
	const [input, setInput] = useState(
		hoursAgo ? removeFromNow(hoursAgo) : removeFromNow(),
	);

	const [language, setLanguage] = useState('English');

	const [hostTimeZone, setHostTimeZone] = useState(timeZone);

	const [languageList, setLanguageList] = useState<Array<Language['title']>>();
	const [languageData, setLanguageData] = useState<Language>();

	const [showTimeZone, setShowTimeZone] = useState(false);

	const [hoursInput, setHoursInput] = useState(hoursAgo ?? '1');

	async function fetchLanguages() {
		const data = await fethText();

		setLanguageData(data.find(lang => lang.lang === language));
		setLanguageList(data.map(lang => lang.lang));
	}

	useEffect(() => {
		void fetchLanguages();
	}, [language, setLanguage]);

	const onLanguageInput: SwitchInput = ({currentTarget: {value}}) => {
		setLanguage(value);

		void fetchLanguages();
	};

	const hoursOnInput: SwitchInput = ({currentTarget: {value}}) => {
		setHoursInput(value);

		setInput(removeFromNow(value));

		pushQuery('hour', value);
	};

	const onTimeZoneInput: SwitchInput = ({currentTarget: {value}}) => {
		setHostTimeZone(value);
	};

	if (!languageData || !languageList) {
		return <p>Loading...</p>;
	}

	return (
		<main className="bg-slate-600 flex flex-col p-5 gap-4 text-2xl text-center min-h-screen">
			<h1 className="underline bold title-case text-4xl">
				{languageData.title}
			</h1>

			<HoursInput handler={hoursOnInput} />

			<p className="b-rounded bg-slate-400 p-4">
        It was {input.toLocaleString('en-US', {timeZone: hostTimeZone})} on{' '}
				{hostTimeZone} {hoursInput} hour ago.
			</p>

			<label>
				<input
					className="mr-3"
					type="checkbox"
					onInput={() => {
						setShowTimeZone(!showTimeZone);
					}}
				/>
        Custom Timezone
			</label>

			{showTimeZone && <TimeZoneSwitch handler={onTimeZoneInput} />}

			<p className="text-gray-200">{languageData.body}</p>

			<LanguageSwitch handler={onLanguageInput} languageList={languageList} />

			<Footer />
		</main>
	);
}

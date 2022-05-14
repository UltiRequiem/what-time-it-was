import {FormEventHandler} from 'react';

export interface LanguageSwitchProps {
	handler: FormEventHandler<HTMLSelectElement>;
	languageList: string[];
}

export const LanguageSwitch = ({
	handler,
	languageList,
}: LanguageSwitchProps) => (
	<section>
		<p>Language</p>

		<select onInput={handler}>
			{languageList.map(lang => (
				<option key={lang} value={lang}>
					{lang}
				</option>
			))}
		</select>
	</section>
);

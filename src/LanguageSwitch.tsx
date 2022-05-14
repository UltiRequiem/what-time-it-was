import {SwitchInput} from './types';

export interface LanguageSwitchProps {
	handler: SwitchInput;
	languageList: string[];
}

export const LanguageSwitch = ({
	handler,
	languageList,
}: LanguageSwitchProps) => (
	<section className="rounded-sm bg-slate-500 py-5">
		<p>Language</p>

		<select onInput={handler} className="w-80">
			{languageList.map(lang => (
				<option key={lang} value={lang}>
					{lang}
				</option>
			))}
		</select>
	</section>
);

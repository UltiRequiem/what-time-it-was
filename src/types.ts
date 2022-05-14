import {FormEventHandler} from 'react';

export interface Language {
	lang: 'string';
	title: 'string';
	body: 'string';
}

export type SwitchInput = FormEventHandler<HTMLSelectElement>;

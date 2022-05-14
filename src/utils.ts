import {Language} from './types';

export function removeFromNow(hours: number | string = 1) {
	const now = new Date();

	if (typeof hours === 'string') {
		hours = Number.parseInt(hours, 10);
	}

	const todayHours = now.getHours();

	if (todayHours <= hours) {
		now.setDate(now.getDate());
	}

	now.setHours(now.getHours() - hours);

	return now;
}

export function getQuery(query: string) {
	const {searchParams} = getQuery.params;

	const value = searchParams.get(query);

	return value;
}

getQuery.params = new URL(window.location.href);

export async function fethText() {
	const response = await fetch('./lang.json');

	/* eslint @typescript-eslint/no-unsafe-assignment: off */
	const data: Language[] = await response.json();

	return data;
}

export function pushQuery(key: string, value: string) {
	const parameters = new URLSearchParams(location.search);

	parameters.set(key, value);

	const newRelativePathQuery = `${location.pathname}?${parameters.toString()}`;

	history.pushState(undefined, '', newRelativePathQuery);
}

export function removeItem<T>(array: T[], value: T): T[] {
	const index = array.indexOf(value);

	if (index > -1) {
		array.splice(index, 1);
	}

	return array;
}

export const {timeZone} = Intl.DateTimeFormat().resolvedOptions();

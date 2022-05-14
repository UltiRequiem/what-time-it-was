import {timeZones} from '@ultirequiem/timezones';

import {removeItem, timeZone} from './utils';

import {SwitchInput} from './types';

export interface TimeZoneProps {
	handler: SwitchInput;
}

const cleanTimezones = removeItem([...timeZones], timeZone);

cleanTimezones.unshift(timeZone);

export const TimeZoneSwitch = ({handler}: TimeZoneProps) => (
	<select onInput={handler}>
		{cleanTimezones.map(timezone => (
			<option key={timezone} value={timezone}>
				{timezone}
			</option>
		))}
	</select>
);

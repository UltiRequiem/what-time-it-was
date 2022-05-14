import {timeZones} from '@ultirequiem/timezones';

import {timeZone, removeItem} from './utils';

import {SwitchInput} from './types';

export interface TimeZoneProps {
	handler: SwitchInput;
}

const cleanTimezones = removeItem([...timeZones], timeZone);

export const TimeZoneSwitch = ({handler}: TimeZoneProps) => (
	<select onInput={handler}>
		<option value={timeZone} key={timeZone}>
			{timeZone}
		</option>

		{cleanTimezones.map(timezone => (
			<option key={timezone} value={timezone}>
				{timezone}
			</option>
		))}
	</select>
);

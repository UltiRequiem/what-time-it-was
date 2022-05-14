import {SwitchInput} from './types';

export interface HoursInputProps {
	hours?: number;
	handler: SwitchInput;
}

export const HoursInput = ({handler, hours = 24}: HoursInputProps) => (
	<select onInput={handler}>
		{Array.from({length: hours}, (_value, index) => {
			const value = index + 1;

			return (
				<option key={value} value={value}>
					{value}
				</option>
			);
		})}
	</select>
);

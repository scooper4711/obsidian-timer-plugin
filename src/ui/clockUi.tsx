import ClockElementSeparatorUi from './clockElementSeparatorUi';
import ClockElementUi from './clockElementUi';
import ClockHeaderTextUi from './clockHeaderTextUi';
import TimerDTO from 'src/timer/timerDTO';
import { TimerSettingsContext } from 'src/views/view';
import { useContext } from 'react';

interface IClockUi {
    timer: TimerDTO;
}

export default function ClockUi({timer}: Readonly<IClockUi>) {
    const timerSettings = useContext(TimerSettingsContext);

    if (timerSettings.useVerboseTimeFormat) {
        return VerboseTimeFormatUi({timer});
    }
    return StandardTimeFormatUi({timer});
}

// Standard Time Format (HH:MM:SS)
function StandardTimeFormatUi({timer}: Readonly<IClockUi>) {
    return <div className="clockContainer">
        <ClockHeaderTextUi />
        <div className="clockElementContainer">
            <ClockElementUi char={timer.hours.charAt(0)} />
            <ClockElementUi char={timer.hours.charAt(1)} />
            <ClockElementSeparatorUi />
            <ClockElementUi char={timer.minutes.charAt(0)} />
            <ClockElementUi char={timer.minutes.charAt(1)} />
            <ClockElementSeparatorUi />
            <ClockElementUi char={timer.seconds.charAt(0)} />
            <ClockElementUi char={timer.seconds.charAt(1)} />
        </div>
    </div>;
}

// Verbose Time Format e.g 17h 12m 03s
function VerboseTimeFormatUi({timer}: Readonly<IClockUi>) {
    const hours = parseInt(timer.hours);
    const minutes = parseInt(timer.minutes);
    const seconds = parseInt(timer.seconds);

    let timeString = '';

    const hoursString = (hours > 0) 
        ? hours.toString() + 'h ' 
        : '';

    const minutesString = (hours > 0) 
        ? timer.minutes + 'm ' 
        : (minutes > 0) 
            ? minutes.toString() + 'm ' 
            : '';

    const secondsString = ((hours > 0 || minutes > 0) 
        ? timer.seconds 
        : seconds.toString()) + 's';

    timeString += hoursString;
    timeString += minutesString;
    timeString += secondsString;

    return (
        <div>
            <h1 className="verboseTimeFormat">{timeString}</h1>
        </div>
    );
}
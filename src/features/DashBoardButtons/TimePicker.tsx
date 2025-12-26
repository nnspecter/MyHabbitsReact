import { Input } from '@mui/material';
import { useState } from 'react'

const TimePicker = () => {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
    });


    return (
        <div>
            <Input
                type="number"
                placeholder="Hours"
                value={time.hours}
                onChange={(e) => setTime({ ...time, hours: Number(e.target.value) })}
            />
            <Input
                type="number"
                placeholder="Minutes"
                value={time.minutes}
                onChange={(e) => setTime({ ...time, minutes: Number(e.target.value) })}
            />
        </div>
    )
}

export default TimePicker

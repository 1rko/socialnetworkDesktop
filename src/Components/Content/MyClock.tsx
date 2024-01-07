import React, {useState} from 'react';

type PropsType={

}

const MyClock = (props: PropsType) => {
    let [time, setTime] = useState(null as string | null)
    setInterval(() => {
        let date = new Date();
        let hours: number = date.getHours()
        let minutes: number = date.getMinutes()
        let seconds: number = date.getSeconds()
        setTime(hours + " : " + minutes + " : " + seconds)
    }, 1000)
    return (
        <span> {time}</span>
    )
}

export default MyClock;

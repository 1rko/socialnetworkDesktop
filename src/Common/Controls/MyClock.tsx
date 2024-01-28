import React, {useState} from 'react';

const MyClock = () => {
    let [time, setTime] = useState('')
    setInterval(() => {
        let date: Date = new Date();
        let hours:string = (date.getHours() < 10) ? ("0" + date.getHours().toString()) : date.getHours().toString()
        let minutes:string = (date.getMinutes() < 10) ? ("0" + date.getMinutes().toString()) : date.getMinutes().toString()
        let seconds:string = (date.getSeconds() < 10) ? ("0" + date.getSeconds().toString()) : date.getSeconds().toString()
        setTime(hours + " : " + minutes + " : " + seconds)
    }, 1000)
    return (
        <span> {time}</span>
    )
}

export default MyClock;

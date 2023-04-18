import React, { useState } from 'react';

const MyClock = (props) => {
    let [time, setTime] = useState(0)
    setInterval(() => {
        let date = new Date();
        let hours = (date.getHours() < 10) ? ("0" + date.getHours()) : date.getHours()
        let minutes = (date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes()
        let seconds = (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds()
        setTime(hours + " : " + minutes + " : " + seconds)
    }, 1000)
    return (
        <span> {time}</span>
    )
}

export default MyClock;

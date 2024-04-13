import React, {useEffect, useState} from "react";

type PropsType = {
    initialSeconds: number
    onTick: (actualSeconds: number) => void
    timerKey:string         //timerKey - для равной скорости работы секунд
}

export function Timer({initialSeconds, onTick, timerKey}: PropsType) {
    const [seconds, setSeconds] = useState<number>(initialSeconds)

    useEffect(() => {
        onTick(seconds)
    }, [seconds])

    useEffect(() => {
        setSeconds(initialSeconds)
    }, [initialSeconds])

    useEffect(() => {
        let intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [timerKey])                              //timerKey - для равной скорости работы секунд, если поменялся user - вызвать cleanUp

    return <div>
        {seconds}
    </div>
}
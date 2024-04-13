import styles from "./GithubUsers.module.css";
import React, {useEffect, useState} from "react";
import {UsersType} from "./GithubUsers";
import axios from "axios";
import {Timer} from "./Timer";

type PropsType = {
    selectedUser: UsersType | null
}

const startTimerSeconds = 5

export function UserDetails({selectedUser}: PropsType) {
    const [userDetails, setUserDetails] = useState<UsersType | null>(null)
    const [seconds, setSeconds] = useState<number>(startTimerSeconds)

    useEffect(() => {
        if (!!selectedUser) {
            axios
                .get(`https://api.github.com/users/${selectedUser.login}`) //
                .then(res => {
                        setSeconds(startTimerSeconds)
                        setUserDetails(res.data)
                    }
                )
        }
    }, [selectedUser])        //search query

    useEffect(() => {
        if (seconds < 1) {
            setUserDetails(null)
        }
    }, [seconds])

    return <div className={styles.usersDetails}>
        {userDetails && <div>
            <Timer initialSeconds={seconds} onTick={setSeconds} timerKey={userDetails.id.toString()}/>

            <h1>{userDetails?.login}</h1>
            <img src={userDetails?.avatar_url} alt={"avatar"} className={styles.avatar}/>
            <div>{userDetails?.login}</div>
        </div>}
    </div>
}
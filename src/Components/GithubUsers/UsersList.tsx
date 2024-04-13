import styles from "./GithubUsers.module.css";
import React, {useEffect} from "react";
import {UsersType} from "./GithubUsers";

type PropsType ={
    users: UsersType[]
    selectedUser: UsersType | null
    onSelectedUser: (user: UsersType) => void
}

export function UsersList({users, selectedUser, onSelectedUser}: PropsType) {
    //const [selectedUser, setSelectedUser] = useState<null | UsersType>(null)

    return <ul className={styles.usersList}>{users.map(u =>
        <li
            key={u.id}
            onClick={() => {
                onSelectedUser(u)
            }}
            className={selectedUser === u ? styles.selected : ''}
        >
            {u.login}
        </li>)}
    </ul>
}
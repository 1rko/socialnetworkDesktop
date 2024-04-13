import React, {useEffect, useState} from 'react';
import styles from './GithubUsers.module.css'
import {UserDetails} from "./UserDetails";
import {UsersList} from "./UsersList";
import {SearchUser} from "./SearchUser";

export type UsersType = {
    login: string,
    id: number,
    avatar_url: string
}

const GithubUsers: React.FC = () => {
    const [users, setUsers] = useState<UsersType[]>([])
    const [selectedUser, setSelectedUser] = useState<null | UsersType>(null)

    useEffect(() => {
        if (!!selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])      //change Title

    return <div className={styles.container}>
        GithubUsers
        <SearchUser onSearch={setUsers}/>
        <div className={styles.usersContainer}>
            <UsersList users={users} selectedUser={selectedUser} onSelectedUser={setSelectedUser}/>
            <UserDetails selectedUser={selectedUser}/>
        </div>
    </div>
}

export default GithubUsers
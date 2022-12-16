import React from 'react';
import styles from './Users.module.css'

const Users = (props) => {
  const allUsers = props.usersData.map(usersItem => {
    return <div className={styles.user_item}>
      <img src={usersItem.url} className={styles.ava} />
      <div>{usersItem.name}</div>
      <div>{usersItem.age}</div>
      <div>{usersItem.messages}</div>
      {usersItem.followed ?
        <button onClick={() => { props.onUnFollow(usersItem.id) }}> 'Unfollow' </button> :
        <button onClick={() => { props.onFollow(usersItem.id) }}>'Follow' </button>
      }
    </div>
  })

  return (
    <div className={styles.users_wrapper}>
      {allUsers}
    </div>
  );
}

export default Users;

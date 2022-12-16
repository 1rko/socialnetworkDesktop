import React from 'react';
import styles from './Users.module.css'

const Users = (props) => {
  const allUsers = props.usersData.map(usersItem => {
    return <div className={styles.user_item}>
      <div>{usersItem.name}</div>
      <div>{usersItem.age}</div>
      <div>{usersItem.messages}</div>
    </div>
  })

  return (
    <div className={styles.users_wrapper}>
      {allUsers}
    </div>
  );
}

export default Users;

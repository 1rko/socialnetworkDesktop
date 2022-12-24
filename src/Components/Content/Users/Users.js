import React from 'react';
import styles from './Users.module.css'
import axios from "axios";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initFromServer: 0
        }
    };

    componentDidMount() {
        axios('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.setState({initFromServer: response.data});
        })
    }

    render() {
        let allUsers;
        if (this.state.initFromServer) {
            allUsers = this.state.initFromServer.items.map(usersItem => {
                let imgSrc=(usersItem.photos.small!==null)?
                    usersItem.photos.small:
                    'https://bobbyhadz.com/images/blog/javascript-check-if-variable-is-not-null/banner.webp'
                return (<div className={styles.user_item}>
                    <img src={imgSrc} className={styles.ava} alt='Аватар'/>:
                    <div>{usersItem.name}</div>
                    <div>{usersItem.status}</div>
                    {usersItem.followed ?
                        <button onClick={() => {
                            this.props.onUnFollow(usersItem.id)
                        }}> 'Unfollow' </button> :
                        <button onClick={() => {
                            this.props.onFollow(usersItem.id)
                        }}>'Follow' </button>
                    }
                </div>)
            })
        } else allUsers = "Данные не загрузились"
        return (
            <div className={styles.users_wrapper}>
                {allUsers}
            </div>
        )
    }
}

/*
const Users = (props) => {
  let initFromServer=axios('https://social-network.samuraijs.com/api/1.0/users').then(response=>{
    console.log(response.data)
  })

  const allUsers = props.usersData.map(usersItem => {
    return <div className={styles.user_item}>
      <img src={usersItem.url} className={styles.ava} alt='Аватар'/>
      <div>{usersItem.name}</div>
      <div>{usersItem.age}</div>
      <div>{usersItem.messages}</div>
      <span>{usersItem.location.country+"  "}</span>
      <span>{usersItem.location.city}</span>

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

 */

export default Users;

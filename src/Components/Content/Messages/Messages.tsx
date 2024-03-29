import React from 'react';
import styles from './Messages.module.css'
import MySwiper from "../../../Common/MySwiper/MySwiper";

const Messages: React.FC = () => {
  return (
    <div className={styles.messages_wrapper}>
      Message
        <MySwiper/>
    </div>
  );
}

export default Messages;

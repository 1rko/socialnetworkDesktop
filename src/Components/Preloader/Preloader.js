import React from 'react';
import styles from './Preloader.module.css'
import preloader from '../../Common/Img/Loading_icon.gif'

const Preloader = () => {
    return (
        <div>
            <img src={preloader}
                 alt='Loading'/>
        </div>
    );
}

export default Preloader;

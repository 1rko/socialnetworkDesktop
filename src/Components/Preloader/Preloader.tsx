import React from 'react';
import styles from './Preloader.module.css'
// @ts-ignore
import preloader from '../../Common/Img/Loading_icon.gif'

const Preloader: React.FC = () => {
    return (
        <div>
            <img src={preloader}
                 alt='Loading'/>
        </div>
    );
}

export default Preloader;

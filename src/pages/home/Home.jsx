import React from 'react';
import { AuthContext } from '../../components';
import landslideGif from '../../assets/landslide.gif';
import FloodGif from '../../assets/Flood.gif';
import styles from './home.module.scss';

export const Home = () => {
  const authContext = React.useContext(AuthContext);

  return (
    <div className={styles.home}>
      Welcome {authContext?.user?.firstName}
      <div className={styles.imageContainer}>
        <img src={FloodGif} alt="Flood GIF" className={styles.roundedCorner} />
        <img src={landslideGif} alt="Landslide GIF" className={styles.roundedCorner} />
      </div>
    </div>
  );
};

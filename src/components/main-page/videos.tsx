import React from 'react';
import Video from './video';
import styles from './video.module.scss';
import EmptyVideo from './empty-video';

type Props = {
  rowArray: object[];
};

const videos = (props: Props) => {
  return (
    <div className={styles.videoComponent}>
      {props.rowArray.map((row: any, index) => {
        if (row.tag === 'empty') {
          return <EmptyVideo />;
        } else {
          return <Video key={row.etag} data={row} />;
        }
      })}
    </div>
  );
};

export default videos;

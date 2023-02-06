import React, { useState } from 'react';
import styles from './Comments.module.scss';

type Props = {
  reply: any;
};

const Reply = ({ reply }: Props) => {
  const [isShow, setIsShow] = useState(false);

  function replyTextt() {
    let textArr = [];
    for (let i = 0; i < reply.replies?.comments.length; i += 1) {
      textArr.push(reply.replies?.comments[i].snippet);
    }
    return textArr;
  }
  const replyText = replyTextt();
  const replyCount = reply.snippet.totalReplyCount;

  function toggleReply() {
    setIsShow(!isShow);
  }

  return (
    <div>
      {replyCount ? (
        <button
          className={isShow ? `${styles.btnViewBottom}` : `${styles.btnViewTop}`}
          onClick={toggleReply}
        >
          답글 {replyCount}개
        </button>
      ) : (
        ''
      )}

      <div className={isShow ? `${styles.show}` : `${styles.hide}`}>
        {replyText
          ? replyText.map((item, index) => {
              return (
                <div key={index} className={styles.flexTop}>
                  <div>
                    <span className={`${styles.profileImg} ${styles.small}`}>
                      <img
                        src={item.authorProfileImageUrl}
                        alt={`${item.authorDisplayName} 프로필 이미지`}
                      />
                    </span>
                  </div>
                  <div>
                    <span className={styles.displayName}>{item.authorDisplayName}</span>
                    <div className={styles.commentText}>{item.textDisplay}</div>
                    <div className={(styles.toolbar, styles.flex)}>
                      <span className="likeBtn">
                        <svg style={{ width: 24, height: 24 }}>
                          <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                        </svg>
                      </span>
                      <span className={styles.likeCountText}>{item.likeCount}</span>
                      <span className={styles.disLikeBtn}>
                        <svg style={{ width: 24, height: 24 }}>
                          <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                        </svg>
                      </span>
                      <span className={styles.btnReply}>답글</span>
                    </div>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Reply;

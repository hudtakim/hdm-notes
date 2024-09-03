import React, { useState } from 'react';
import styles from './style.module.scss';
import { noteListType } from '@/app/lib/types';

const NoteCard: React.FC<noteListType> = ({data, selectedId, setSelectedId}) => {

  const GetBriefText = (sentence:string, limit: number) => {
    if (sentence.length > limit) {
      return sentence.substring(0, limit);
    } else {
      return sentence;
    }
  }

  const selectedStyle = {
    backgroundColor: 'rgba(255, 192, 0, 0.77)',
    color: 'black',
  }

  const CardClicked = () => {
    if(selectedId === data.id){
      setSelectedId(-1);
    }else{
      const audio = new Audio('/menu-sound.wav');
      audio.play();
      setSelectedId(data.id);
    }
  }

  return (
    <div className={styles.main} onClick={CardClicked} style={selectedId === data.id ? selectedStyle : undefined}>
      <div className={styles.title}>{data.title + ' / ' + data.category}</div>
      <div className={styles.text}>{ GetBriefText(data.text, 100) + '...'}</div>
    </div>
  )
}

export default NoteCard

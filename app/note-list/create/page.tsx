"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Dropdown from "../../component/dropdown/dropdown";
import { useState } from "react";
import { categoryList } from '@/app/lib/dummy-category';

const NoteList = () => {
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const router = useRouter();

  const BackBtnClicked = () => {
    const audio = new Audio('/back-sound.wav');
    audio.play();
    router.push('/note-list');
  }

  const SaveBtnClicked = () => {
    const audio2 = new Audio('/save-sound.wav');
    audio2.pause();
    audio2.play();
    setIsSaved(true);
  }

  const buttonDisabled: React.CSSProperties = {
    filter: 'brightness(0.5)',
    pointerEvents: 'none'
  }

  const HandleTextChange = () => {
    setIsSaved(false);
  }

  return (
    <div className={styles.main}>
        <div className={styles['filter-section']}>
            <div className={styles['back-btn-section']}>
                <button className={styles['back-btn']} onClick={BackBtnClicked}></button>
            </div>
            <div className={styles['filter-dropdown-section']}>
                <div className={styles['filter-dropdown-container']}>
                  <input type="text" className={styles['input-title']} placeholder="Title"/>
                </div>
                <div className={styles['filter-dropdown-container']}>
                  <Dropdown data={categoryList} placeholder="Category"/>
                </div>
            </div>
        </div>
        <div className={styles['notes-section']}>
          <textarea name="" id="" onChange={HandleTextChange}></textarea>
        </div>
        <div className={styles['button-section']}>
          <button className={styles['save-btn']} onClick={SaveBtnClicked} style={isSaved ? buttonDisabled : undefined}></button>
          <span className={styles.date}>
            09 Aug 2024
          </span>
        </div>
    </div>
  )
}

export default NoteList

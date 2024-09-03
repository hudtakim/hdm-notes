"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Dropdown from "../component/dropdown/dropdown";
import { noteList } from "../lib/dummy-list";
import NoteCard from "./component/note-card/NoteCard";
import { useState } from "react";
import { categoryList } from '@/app/lib/dummy-category';

const NoteList = () => {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const router = useRouter();

  const BackBtnClicked = () => {
    const audio = new Audio('/back-sound.wav');
    audio.play();
    router.push('/');
  }

  const DeleteBtnClicked = () => {
    const audio2 = new Audio('/action-sound.wav');
    audio2.pause();
    audio2.play();
  }

  const EditBtnClicked = () => {
    const audio2 = new Audio('/action-sound.wav');
    audio2.pause();
    audio2.play();
  }

  const NewBtnClicked = () => {
    const audio2 = new Audio('/action-sound.wav');
    audio2.pause();
    audio2.play();
    router.push('/note-list/create');
  }

  const buttonDisabled: React.CSSProperties = {
    filter: 'brightness(0.5)',
    pointerEvents: 'none'
  }

  const GetNoteList = () => {
    return noteList.map(row => { //id, title, text, category
      return (
        <NoteCard data={row} selectedId={selectedId} setSelectedId={setSelectedId} key={row.id}/>
      )
    });
  }

  return (
    <div className={styles.main}>
        <div className={styles['filter-section']}>
            <div className={styles['back-btn-section']}>
                <button className={styles['back-btn']} onClick={BackBtnClicked}></button>
            </div>
            <div className={styles['filter-dropdown-section']}>
                <div className={styles['filter-dropdown-container']}>
                  <Dropdown data={categoryList} placeholder="Category"/>
                </div>
                <div className={styles['filter-dropdown-container']} >
                  <Dropdown data={categoryList} placeholder="Sort by"/>
                </div>
            </div>
        </div>
        <div className={styles['list-section']}>
        {GetNoteList()}
        </div>
        <div className={styles['button-section']}>
            <button className={styles['delete-btn']} onClick={DeleteBtnClicked} style={selectedId === -1 ? buttonDisabled : undefined}></button>
            <button className={styles['edit-btn']} onClick={EditBtnClicked} style={selectedId === -1 ? buttonDisabled : undefined}></button>
            <button className={styles['new-btn']} onClick={NewBtnClicked}></button>
        </div>
    </div>
  )
}

export default NoteList

"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Dropdown from "../../component/dropdown/dropdown";
import { ChangeEvent, useState, useEffect } from "react";
import { categoryList } from '@/app/lib/dummy-category';
import { dropdownInterface, dropdownType, noteDataType } from "@/app/lib/types";
import { FormatDate } from "@/app/lib/services";
import { CreateNote } from "@/app/lib/actions";

const NoteList = () => {
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [category, setCategory] = useState<dropdownType>();

  useEffect(() => {
    setData({...data, category: category ? category.text : ''});
  }, [category])

  const [data, setData] = useState<noteDataType>({
    id: -1,
    title: '',
    category: '',
    text: '',
    date: new Date()
  });

  const router = useRouter();

  const BackBtnClicked = () => {
    const audio = new Audio('/back-sound.wav');
    audio.play();
    const lastRoute = sessionStorage.getItem('lastRoute');
    router.push(lastRoute ? lastRoute : '/note-list');
  }

  const SaveBtnClicked = async() => {
    const audio2 = new Audio('/save-sound.wav');
    audio2.pause();
    audio2.play();
    setIsSaved(true);
    console.log(data);
    const createdId = await CreateNote(data);
    router.push(`/note-list/${createdId}/edit`);
  }

  const buttonDisabled: React.CSSProperties = {
    filter: 'brightness(0.5)',
    pointerEvents: 'none'
  }

  const HandleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIsSaved(false);
    setData({...data, text: e.target.value});
  }

  const HandleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSaved(false);
    setData({...data, title: e.target.value});
  }

  return (
    <div className={styles.main}>
        <div className={styles['filter-section']}>
            <div className={styles['back-btn-section']}>
                <button className={styles['back-btn']} onClick={BackBtnClicked}></button>
            </div>
            <div className={styles['filter-dropdown-section']}>
                <div className={styles['filter-dropdown-container']}>
                  <input type="text" className={styles['input-title']} placeholder="Title" value={data.title} onChange={(e) => HandleTitleChange(e)} />
                </div>
                <div className={styles['filter-dropdown-container']}>
                  <Dropdown data={categoryList} placeholder="Category" setValue={setCategory}/>
                </div>
            </div>
        </div>
        <div className={styles['notes-section']}>
          <textarea name="" id="" onChange={(e) => HandleTextChange(e)} value={data.text}></textarea>
        </div>
        <div className={styles['button-section']}>
          <button className={styles['save-btn']} onClick={SaveBtnClicked} style={isSaved ? buttonDisabled : undefined}></button>
          <span className={styles.date}>
           {FormatDate(data.date)}
          </span>
        </div>
    </div>
  )
}

export default NoteList

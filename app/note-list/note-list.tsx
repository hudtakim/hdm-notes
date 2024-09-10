"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Dropdown from "../component/dropdown/dropdown";
import NoteCard from "./component/note-card/NoteCard";
import { useState, useEffect} from "react";
import { categoryList} from '@/app/lib/dummy-category';
import { sortList } from "../lib/dummy-sort";
import { dropdownType, noteDataType, noteListInterface } from "../lib/types";
import DeletePopUp from "./component/delete-popup/delete-popup";

const NoteListClient: React.FC<noteListInterface> = ({data, category_q, sortby_q}) => {
  const [selectedId, setSelectedId] = useState<number>(-1);
  const defCategory = categoryList.filter(row => row.text === category_q);
  const defSortby = sortList.filter(row => row.text === sortby_q);
  const [category, setCategory] = useState<dropdownType>(defCategory[0]);
  const [sortBy, setSortBy] = useState<dropdownType>(defSortby[0]);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);

  const router = useRouter();

  useEffect(()=> {
    const param1 = category ? category.text : null;
    const param2 = sortBy ? sortBy.text : null;
    let newRoute = '';
    if(param1 && param2){
      newRoute = `/note-list?category=${param1}&sortby=${param2}`;
    }else if(param1){
      newRoute = `/note-list?category=${param1}`;
    }else if(param2){
      newRoute = `/note-list?sortby=${param2}`;
    }else{
      newRoute = `/note-list`;
    }
    router.push(newRoute);
    sessionStorage.setItem('lastRoute', newRoute);
  }, [category, sortBy])

  const BackBtnClicked = () => {
    const audio = new Audio('/back-sound.wav');
    audio.play();
    router.push('/');
  }

  const DeleteBtnClicked = () => {
    const audio2 = new Audio('/action-sound.wav');
    audio2.pause();
    audio2.play();
    setDeletePopUp(true);
  }

  const EditBtnClicked = () => {
    const audio2 = new Audio('/action-sound.wav');
    audio2.pause();
    audio2.play();
    router.push('/note-list/' + selectedId + '/edit');
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
    const notesData = data;

    return notesData.map(row => { //id, title, text, category
      return (
        <NoteCard data={row} selectedId={selectedId} setSelectedId={setSelectedId} key={row.id}/>
      )
    });
  }

  const GetDeletePopUp = () => {
    return (
      <DeletePopUp setPopUpDisplay={setDeletePopUp} selectedId={selectedId}/>
    )
  }

  return (
    <div className={styles.main}>
        <div className={styles['filter-section']}>
            <div className={styles['back-btn-section']}>
                <button className={styles['back-btn']} onClick={BackBtnClicked}></button>
            </div>
            <div className={styles['filter-dropdown-section']}>
                <div className={styles['filter-dropdown-container']}>
                  <Dropdown data={categoryList} placeholder="Category" value={category} setValue={setCategory}/>
                </div>
                <div className={styles['filter-dropdown-container']} >
                  <Dropdown data={sortList} placeholder="Sort by" value={sortBy} setValue={setSortBy}/>
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
        {deletePopUp ? GetDeletePopUp() : null}
    </div>
  )
}

export default NoteListClient

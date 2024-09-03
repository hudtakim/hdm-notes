import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { dropdownInterface, dropdownType } from '@/app/lib/types';

const Dropdown:React.FC<dropdownInterface> = ({data, placeholder}) => {
  const categoryList = data;
  const [showList, setShowList] = useState<boolean>(false);
  const [selected, setSelected] = useState<dropdownType>();
  
  const showListStyle = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }

  const DropdownClicked = () => {
    setShowList(!showList);
  }

  const GetList = () => {
    return categoryList.map(row => {
      return (
        <div className={styles['list-section']} id={row.id + ''} onClick={() => setSelected(row)} key={row.id}>
          <span>{row.text}</span>
        </div>
      )
    });
  }

  return (
    <div className={styles.main} onClick={DropdownClicked} style={showList ? showListStyle : undefined}>
        <div className={styles.wrapper}>
          <div className={styles['content-section']}>
            <span>{selected ? selected.text : placeholder}</span>
          </div>
          <div className={styles['icon-section']}>
            <Image
                src="/dropdown-icon.png"
                alt="Description of the image"
                width={12}
                height={6}
            />
          </div>
        </div>
        <div className={styles['list-wrapper']} style={!showList ? {display: 'none'} : undefined}>
          {GetList()}
        </div>
    </div>
  )
}

export default Dropdown

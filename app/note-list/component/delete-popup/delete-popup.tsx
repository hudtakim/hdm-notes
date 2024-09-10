import styles from './style.module.scss'
import Image from 'next/image'
import { DeleteNoteById } from '@/app/lib/actions'

import { deletePopUpInterface } from '@/app/lib/types'

const DeletePopUp: React.FC<deletePopUpInterface>= ({setPopUpDisplay, selectedId}) => {
  const handleConfirm = async () => {
    await DeleteNoteById(selectedId.toString());
    setPopUpDisplay(false);
  }

  const handleCancel = () => {
    setPopUpDisplay(false)
  }

  return (
    <div className={styles.main}>
        <div className={styles.container}>
            <div className={styles.header}>
                <Image
                    src="/delete-lamp.png"
                    alt="Description of the image"
                    width={100}
                    height={100}
                    layout="responsive"
                />
            </div>
            <div className={styles.message}>
                <span>Are you sure, you want to delete the selected note?</span>
            </div>
            <div className={styles.actions}>
                <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
                <button className={styles.confirm} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePopUp

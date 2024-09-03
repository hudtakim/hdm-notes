"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const HandleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    }
  };

  const startClicked = () => {
    const audio = new Audio('/start-sound.wav');
    audio.play();
    setLoading(true);
    setTimeout(() => {
      router.push('/note-list');
      HandleFullscreen();
    }, 5000);
};

  return (
    <div className={styles.main}>
      <div className={styles["title-wrapper"]}>
        <div className={styles["top-lamp"]}>
          <Image
            src="/top-lamp.png"
            alt="Description of the image"
            width={100}
            height={100}
            layout="responsive"
          />
        </div>
        <div className={styles["title-section"]}>
          <Image
              src="/main-title.png"
              alt="Description of the image"
              width={100}
              height={100}
              layout="responsive"
            />
          </div>
        <div className={styles["bottom-lamp"]}>
          <Image
              src="/bottom-lamp.png"
              alt="Description of the image"
              width={100}
              height={100}
              layout="responsive"
          />
        </div>
      </div>
      <Image
          src="/start-btn.png"
          alt="Description of the image"
          width={120}
          height={120}
          className={styles[loading ? "start-button-loading" : "start-button"]}
          onClick={startClicked}
      />

      <Image
          src="/loading.png"
          alt="Description of the image"
          width={170}
          height={65}
          className={styles[loading ? "loading-show" : "loading-hide"]}
      />
    </div>
  );
}

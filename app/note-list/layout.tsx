import styles from "./page.module.scss";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HDM Notes - Note List",
  description: "HDM Notes - Gotta notes 'em all",
};

export default function NoteListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles["layout-main"]}>
        <Image
            src="/header.png"
            alt="Description of the image"
            width={100}
            height={100}
            layout="responsive"
            className={styles.header}
        />
        {children}
    </div>
  )
}

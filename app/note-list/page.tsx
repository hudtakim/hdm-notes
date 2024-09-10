import { FetchNotes } from "../lib/actions";
import NoteListClient from "./note-list";

const NoteList = async ({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    sortby?: string;
  };
}) => {
  const category = searchParams?.category || '';
  const sortby =  searchParams?.sortby || '';

  const notesData = await FetchNotes(category, sortby);

  return (
    <>
      <NoteListClient data={notesData} category_q={category} sortby_q={sortby}/>
    </>
  )
}

export default NoteList

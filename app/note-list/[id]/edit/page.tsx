import { FetchNoteById } from "@/app/lib/actions";
import NoteListEdit from "./note-list-edit";

const NoteListEditServer = async({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [noteData] = await Promise.all([
    FetchNoteById(id)
  ]);
  
  return (
    <NoteListEdit noteData = {noteData}  />
  )
}

export default NoteListEditServer

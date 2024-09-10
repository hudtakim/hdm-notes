'use server';

import { noteDataType } from "./types";
import { sql } from '@vercel/postgres';

const CreateNote = async (formData: noteDataType) => {
    console.log('CreateNote executed!');
    const {title, category, text, date} = formData;
    const dateStr = date.toISOString();

    try {
        const data = await sql`
          INSERT INTO notes (title, category, text, date)
          VALUES (${title}, ${category}, ${text}, ${dateStr})
          RETURNING id;
        `;

        return data.rows[0].id;
      } catch (error) {
        return {
          message: 'Database Error: Failed to Create Note.',
        };
      }
}

const UpdateNote = async (formData: noteDataType) => {
  const {id, title, category, text, date} = formData;
  const dateStr = date.toISOString();
  console.log(formData);

  try {
      await sql`
        UPDATE notes 
        SET title = ${title}, category = ${category}, text = ${text}, date = ${dateStr}
        WHERE id = ${id}
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Update Note.',
      };
    }
}

const FetchNotes = async (category: string, sortby: string) => {
  console.log('FetchNotes Executed: ' + category + ' -- ' + sortby);
  const sortbyFilter: string = sortby === 'Title' ? `title ASC` : `id DESC`;
  console.log(sortbyFilter);
  try {
    const data = await sql<noteDataType>`
      SELECT
        *
      FROM 
        notes
      WHERE 
        category = ${category} OR ${category} = ''
      ORDER BY
        ${sortbyFilter}
    `;

    const notes = data.rows;
    return notes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all notes.');
  }
}

const FetchNoteById = async (id: string) => {
  console.log('FetchNotes Executed');

  try {
    const data = await sql<noteDataType>`
      SELECT
        *
      FROM 
        notes
      WHERE 
        id = ${id}
    `;

    console.log(data);
    const notes = data.rows;
    return notes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all notes.');
  }
}

const DeleteNoteById = async (id: string) => {
  console.log('DeleteNoteById Executed: id ' + id);

  try {
    const data = await sql<noteDataType>`
      DELETE FROM 
        notes
      WHERE 
        id = ${id}
    `;

    console.log(data);
    // const notes = data.rows;
    // return notes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to delete notes.');
  }
}

export {CreateNote, FetchNotes, FetchNoteById, UpdateNote, DeleteNoteById};
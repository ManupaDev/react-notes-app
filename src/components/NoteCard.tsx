import { Note } from "../types/note";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
dayjs.extend(relativeTime)

type NoteCardProps = Note & {
    deleteNote: (id: number) => void
};

function NoteCard({ title, text, date, id, deleteNote }: NoteCardProps) {
    return (
        <div className="note">
            <h1>{title}</h1>
            <p className="note-message-preview">{text}</p>
            <span className="note-timestamp">{dayjs(date).fromNow()}</span>
            <span className="delete-btn" onClick={() => deleteNote(id)}>Delete</span>
            <button>View</button>
        </div>);
}

export default NoteCard;
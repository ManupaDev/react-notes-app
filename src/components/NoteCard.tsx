import { Note } from "../types/note";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime)

type NoteCardProps = Note & {
    deleteNote: (id: number) => void
};

function NoteCard({ title, text, date, id, deleteNote }: NoteCardProps) {

    const navigate = useNavigate();

    return (
        <div className="note">
            <h1>{title}</h1>
            <p className="note-message-preview">{text}</p>
            <span className="note-timestamp">{dayjs(date).fromNow()}</span>
            <span className="delete-btn" onClick={() => deleteNote(id)}>Delete</span>
            <button onClick={() => navigate(`/note/${id}`)}>View</button>
        </div>);
}

export default NoteCard;
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Note } from "../../types/note";
import "./note.css";

function NotePage() {

    const [note, setNote] = useState<Note | undefined>();
    const params = useParams();

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await fetch("/notes.json");
            const noteData = (await res.json()).notes;
            return noteData;
        }
        fetchNotes()
        .then((data: Note[]) =>
         setNote(data.find(note => note.id === parseInt(params.id as string))))
        .catch((error) => console.log(error));
    }, []);

    return (
        <main>
            <Link to={"/"}>&lt; Back</Link>
            <h1 className="page-title">{note?.title}</h1>
            <span>{dayjs(note?.date).fromNow()}</span>
            <p id="content">{note?.text}</p>
        </main>);
}

export default NotePage;
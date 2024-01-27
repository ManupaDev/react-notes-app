import { FormEvent, useRef } from "react";
import "./Header.css"

function Header({ addNote }: { addNote: (params: { title: string; text: string; date: string; }) => void }) {

    // Ref can be used to set a variable that sits outside of React lifecycle.  
    const ref = useRef<HTMLDialogElement | null>(null); //The DOM node of the HTMLDialogElement is stored

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const title = formData.get("title") as string;
        const text = formData.get("message") as string;

        addNote({
            title,
            text,
            date: new Date().toISOString(),
        });
        e.currentTarget.reset();
        ref.current?.close();
    }

    return (
        <>
            <header>
                <h1 className="primary-title">Notes</h1>
                <button id="add-note-btn" className="btn" onClick={() => ref.current?.showModal()}>Add Note</button>
            </header>

            <dialog id="add-note-dialog" ref={ref}>
                <h1>Add Note</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="note-title">Title</label>
                    <input type="text" id="note-title" name="title" placeholder="Title" required />

                    <label htmlFor="note-message">Message</label>
                    <textarea id="note-message" name="message" placeholder="Message" required />

                    <footer>
                        <button type="submit" className="btn">Add</button>
                        <button type="button" className="btn" id="cancel-btn" onClick={() => ref.current?.close()}>Cancel</button>
                    </footer>
                </form>
            </dialog>
        </>
    );
}

export default Header;
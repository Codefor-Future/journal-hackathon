import React, { useState } from 'react';

function TextEditor() {
    const [text, setText] = useState('');
    const [selectionStart, setSelectionStart] = useState(0);
    const [selectionEnd, setSelectionEnd] = useState(0);

    const handleBold = () => {
        const selectedText = text.substring(selectionStart, selectionEnd);
        setText(
            text.slice(0, selectionStart) +
            `<b>${selectedText}</b>` +
            text.slice(selectionEnd)
        );
        setSelectionEnd(selectionStart + 3 + selectedText.length); // Account for "<b>" and "</b>" tags
    };

    const handleItalic = () => {
        const selectedText = text.substring(selectionStart, selectionEnd);
        setText(
            text.slice(0, selectionStart) +
            `<i>${selectedText}</i>` +
            text.slice(selectionEnd)
        );
        setSelectionEnd(selectionStart + 3 + selectedText.length); // Account for "<i>" and "</i>" tags
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSelection = (event) => {
        setSelectionStart(event.target.selectionStart);
        setSelectionEnd(event.target.selectionEnd);
    };

    return (
        <div>
            <div>
                <button onClick={handleBold}>Bold</button>
                <button onClick={handleItalic}>Italic</button>
            </div>
            <textarea
                value={text}
                onChange={handleChange}
                onSelectionChange={handleSelection}
            />
            <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    );
}

export default TextEditor;

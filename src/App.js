import React, {useEffect, useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

const App = () => {
    const [editorData, setEditorData] = useState('');
    const [apiData, setApiData] = useState([]);

    const saveData = () => {
        fetch('http://localhost:5000/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: editorData}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Data save:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const dbData = async () => {
        const response = await axios.get("http://localhost:5000/edit");
        if (response.status !== 201) {
            throw new Error("Error response is not ok")
        }
        const db = await response
        setApiData(db.data.data[1].data)
    }


    useEffect(() => {
        dbData()
    }, [])


    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />
            <button onClick={saveData}>Save to MongoDB</button>
        </div>
    );
};

export default App;

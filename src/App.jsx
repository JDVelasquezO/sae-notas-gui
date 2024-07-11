import './App.css';
// import {sendFiles} from "./api/Endpoints.js";
import {useState} from "react";

function App() {
    const [ file1, setFile1 ] = useState(null);
    const [ file2, setFile2 ] = useState(null);
    const [ file3, setFile3 ] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [ msgAlert, setMsgAlert ] = useState("");

    const handleFileChange1 = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleFileChange2 = (e) => {
        setFile2(e.target.files[0]);
    };

    const handleFileChange3 = (e) => {
        setFile3(e.target.files[0]);
    };

    const clearFiles = () => {
        setFile1(null);
        setFile2(null);
        setFile3(null);
        setDownloadLink('');
    }

    async function sendData(e) {
        try {
            e.preventDefault();
            const formData = new FormData();

            formData.append('file1', file1);
            formData.append('file2', file2);
            formData.append('file3', file3);

            // console.log(formData);
            const req = await fetch("http://localhost:5000/process", {
                method: 'POST',
                body: formData
            });

            if (req.ok) {
                const res = await req.json();
                setDownloadLink(`http://localhost:5000/download/${res.filename}`);
                setMsgAlert("Datos procesados correctamente");
                setTimeout(() => {
                    setMsgAlert("");
                }, 2500);
            } else {
                setMsgAlert(`Error: ${req.statusText}`);
                // console.log("Error: ");
            }

            clearFiles();
        } catch (err) {
            console.log(err);
            setMsgAlert(`Error: ${err}`);
        }
    }

    return (
        <>
            <h1>SaeSap - Notas</h1>
            <h2>{ msgAlert }</h2>
            <form>
                <div>
                    <label htmlFor="file1">Archivo ODS:</label>
                    <input type="file" name="file1" onChange={handleFileChange1}/>
                </div>
                <br/>
                <div>
                    <label htmlFor="file2">Archivo XLSX:</label>
                    <input type="file" name="file2" onChange={handleFileChange2}/>
                </div>
                <br/>
                <div>
                    <label htmlFor="file3">Archivo JSON:</label>
                    <input type="file" name="file3" onChange={handleFileChange3}/>
                </div>
                <br/>
                <div>
                    <button onClick={sendData}>Operar</button>
                </div>
            </form>
            { downloadLink && (
                <div>
                    <a href={downloadLink}>Descargar</a>
                </div>
            )}
        </>
    );
}

export default App;

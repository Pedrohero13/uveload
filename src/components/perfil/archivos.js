import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../../service/firebase'
import { useState, useEffect } from "react";

export default function Archivos() {
    const [files, setFiles] = useState([])

    useEffect(() => {

        const q = query(collection(db, 'files'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setFiles(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, []);
    console.log(files);
    return (

        <div className="container" style={{ marginTop: "7em" }} >
            <h1 class="text-center text-info">Archivos guardados</h1>

            {files.map((archivo, index) => (
                <div className="container " key={index}>
                    <div class="row row-cols-1 row-cols-md-3 g-4  justify-content-around  ">
                        <div class="col">
                            <div class="card h-100">
                                <img src={archivo.data.imageUrl} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{archivo.data.title}</h5>
                                    <p class="card-text">{archivo.data.description}</p>
                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">subido por: {archivo.data.user}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}


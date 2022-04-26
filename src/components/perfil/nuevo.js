import { db, auth, storage } from '../../service/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";


export default function Nuevo() {
    const [user, loading, error] = useAuthState(auth);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const allInputs = { imgUrl: '' }
    const [imageAsFile, setImageAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState(allInputs)


    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }
        const sotrageRef = ref(storage, `files/${imageAsFile.name}`)
        const uploadTask = uploadBytesResumable(sotrageRef, imageAsFile);
        uploadTask.on('state_changed',
            (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    alert("archivo subido ", downloadURL)
                    console.log("File available at", downloadURL);
                    setImageAsUrl(downloadURL);
                    console.log("url: ", imageAsUrl);


                });
            })
    }
    /* function to add new file to firestore */
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, 'files'), {
                user: user?.email,
                title: title,
                description: description,
                imageUrl: imageAsUrl,
                created: Timestamp.now()
            })
            alert("Guardado correctamente")
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="container" style={{ marginTop: "7em" }}>
            <h1 class="text-center text-success">Guardar nuevo archivo</h1>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Titulo</label>
                <input type="text" class="form-control" id="exampleFormControlInput1"
                    placeholder="Titulo" onChange={(e) => setTitle(e.target.value.toUpperCase())}
                    value={title} />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Descripcion</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
            </div>

            <div>
                <label for="formFileLg" class="form-label">Archivo</label>
                <input onChange={handleImageAsFile} class="form-control form-control-lg" id="formFileLg" type="file" />
            </div>
            <div class="row">
                <div class="col">
                    <button onClick={handleFireBaseUpload} type="button" class="btn btn-info">Cargar archivo</button>
                </div>
                <div class="col">
                    <button onClick={handleSubmit} type="button" class="btn btn-info">Guardar</button>
                </div>
            </div>
        </div>
    )
}

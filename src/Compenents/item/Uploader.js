import { useState } from 'react';
import storage  from './firebaseConfig'; // Assuming you have a firebase.js file with Firebase initialization

import './item.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No selected file');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) {
      return; // No image selected
    }

    const storageRef = storage.ref();
    const uploadTask = storageRef.child(`images/${fileName}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle progress
      },
      (error) => {
        console.error('Error uploading image:', error);
      },
      () => {
        // Upload completed successfully, get download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          // Now you can use `downloadURL` as needed
        });
      }
    );
  };

  return (
    <main>
      <form className='uploadPic' onClick={() => document.querySelector('.input-field').click()}>
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={handleFileChange}
        />

        {image ? (
          <img src={image} width={200} height={50} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>

      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf" />
        <span className="upload-content">
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName('No selected File');
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;

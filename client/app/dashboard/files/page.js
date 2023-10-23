'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import './Files.css'
import { storage } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import {ref, uploadBytes, getDownloadURL, getStorage, listAll, deleteObject} from "firebase/storage";

const FilesPage = () => {

    const router = useRouter();
    // State to hold the list of files and the selected file for upload
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);


    // Function to fetch the list of files from Firebase Storage
    useEffect(() => {
        const fetchFiles = async () => {
            const filesRef = ref(storage, 'files/');
            try {
                const result = await listAll(filesRef);
                const filePromises = result.items.map(async (itemRef) => {
                    const downloadURL = await getDownloadURL(itemRef);
                    return {
                        name: itemRef.name,
                        fileId: itemRef.fullPath,
                        dateUploaded: new Date().toLocaleDateString(), // You might want to store the date in Firebase as well
                        ref: downloadURL
                    };
                });
                const filesList = await Promise.all(filePromises);
                setFiles(filesList);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    // Function to handle file upload
    const uploadFile = async () => {
        if (!file) return;

        const storageRef = ref(storage, 'files/' + file.name);
        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File uploaded!', downloadURL);
            // Here you can update the state or do something else with the download URL
            // For example, add the file info to the files array
            setFiles(prevFiles => [...prevFiles, {name: file.name, fileId: snapshot.metadata.fullPath, dateUploaded: new Date().toLocaleDateString(), ref: downloadURL}]);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Function to handle file deletion
    const deleteFile = async (filePath) => {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
            console.log('File deleted successfully');
            setFiles(files => files.filter(file => file.fileId !== filePath));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const navigateToDashboard = () => {
        router.push("/dashboard", { scroll: false });
    }


    return (
        <div className="files-container">
            <h2 className="files-header">Files</h2>
            {/* File input to select a file */}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {/* Button to trigger file upload */}
            <button onClick={uploadFile}>Upload File</button>
            {/* List of files */}
            {files.map((file, index) => (
                <div key={index} className="file-item">
                    <Link
                        href={{
                            pathname:`/dashboard/files/${file.fileId}`,
                            query: { fileId: file.fileId, fileName: file.name },
                        }}
                        className='file-name'>{file.name}</Link>
                    <a href={file.ref} target="_blank" rel="noopener noreferrer">Download</a>
                    <button onClick={() => deleteFile(file.fileId)}>Delete</button>
                </div>
            ))}
            {/* Button to return to the dashboard */}
            <button onClick={navigateToDashboard}>Return to Dashboard</button>
        </div>
    );
}

export default FilesPage;
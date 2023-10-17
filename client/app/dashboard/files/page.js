'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './Files.css'

const FilesPage = () => {

    const [files, setFiles] = useState([
        {name:'practice-quiz-1', fileId: 1, dateUploaded:'10-16-2023', ref:''},
        {name:'building-materials-guide', fileId: 2, dateUploaded:'10-15-2023', ref:''},
        {name:'syllabus', fileId: 3, dateUploaded:'10-12-2023', ref:''}
    ]);

    const openFile = (file) => {
        
    }

    return (
        <div className="files-container">
        <h2 className="files-header">Files</h2>
        {files.map((file) => (
        <div key={file.name} className="file-item" onClick={openFile(file)}>
            <Link
                href={{
                    pathname:`/dashboard/files/${file.fileId}`,
                    query: { fileId: file.fileId },
                }}
                className='file-name'>{file.name}</Link>
        </div>
        ))}
        </div>
    )
}

export default FilesPage
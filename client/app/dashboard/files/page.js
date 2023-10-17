'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './Files.css'

const FilesPage = () => {

    const [files, setFiles] = useState([
        {name:'practice-quiz-1', fileId: 1234, dateUploaded:'10-16-2023', ref:''},
        {name:'building-materials-guide', fileId: 4321, dateUploaded:'10-15-2023', ref:''},
    ]);

    return (
        <div className="files-container">
        <h2 className="files-header">Files</h2>
        {files.map((file) => (
        <div key={file.name} className="file-item">
            <Link
                href={{
                    pathname:`/dashboard/files/${file.fileId}`,
                    query: { fileId: file.fileId, fileName: file.name },
                }}
                className='file-name'>{file.name}</Link>
        </div>
        ))}
        </div>
    )
}

export default FilesPage
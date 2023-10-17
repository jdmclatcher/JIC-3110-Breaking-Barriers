'use client';
import { useParams } from "next/navigation";
import { useState } from "react";
import {Document, Page} from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ViewFile = () => {
    const {fileId, fileName} = useParams();
    console.log(fileName)

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="file-container">
            {fileId}
            <Document file={``} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber}/>
            </Document>
        </div>
    );
}

export default ViewFile;
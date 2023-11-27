"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./Files.css";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/initSupabase";

const FilesPage = () => {
  const router = useRouter();
  // State to hold the list of files and the selected file for upload
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  const bucketName = "breaking-barriers";

  // Function to fetch the list of files from Supabase Storage
  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list("files/");
      if (error) {
        console.error("Error fetching files:", error);
      } else {
        const filesList = data.map((file) => ({
          name: file.name,
          fileId: file.id,
          dateUploaded: new Date(file.created_at).toLocaleDateString(),
          ref: `${
            supabase.storage.from(bucketName).getPublicUrl("files/" + file.name)
              .publicURL
          }`,
        }));
        setFiles(filesList);
      }
    };

    fetchFiles();
  }, []);

  // Function to handle file upload
  const uploadFile = async () => {
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `files/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      console.log("File uploaded!");
      const downloadURL = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath).publicURL;
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: file.name,
          fileId: filePath,
          dateUploaded: new Date().toLocaleDateString(),
          ref: downloadURL,
        },
      ]);
    }
  };

  // Function to handle file deletion
  const deleteFile = async (filePath) => {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully");
      setFiles((files) =>
        files.filter((file) => "files/" + file.name !== filePath)
      );
    }
  };

  // Function to handle file download
  const downloadFile = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download("files/" + fileName);

      if (error) {
        throw error;
      }

      // Create a URL for the blob
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error.message);
    }
  };

  const navigateToDashboard = () => {
    router.push("/dashboard", { scroll: false });
  };

  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-300 p-4 h-screen flex justify-center items-center">
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
                pathname: `/dashboard/files/${file.fileId}`,
                query: { fileId: file.fileId, fileName: file.name },
              }}
              className="file-name"
            >
              {file.name}
            </Link>
            <button onClick={() => downloadFile(file.name)}>Download</button>
            <button onClick={() => deleteFile("files/" + file.name)}>
              Delete
            </button>
          </div>
        ))}
        {/* Button to return to the dashboard */}
        <button onClick={navigateToDashboard}>Return to Dashboard</button>
      </div>
    </div>
  );
};

export default FilesPage;

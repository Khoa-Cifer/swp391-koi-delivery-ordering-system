import React, { useState, useEffect, useRef } from "react";
import { CreateNews } from "../../../../utils/axios/news";
import { Editor } from "@tinymce/tinymce-react"; // Nhập Editor từ TinyMCE
import "./Maincontent.scss"; // Import một tệp CSS cho kiểu dáng
import { jwtDecode } from "jwt-decode";

function Maincontent() {
  const [file, setFile] = useState(null);

  const [salesStaffId, setSalesStaffId] = useState(0);
  const editorRef = useRef(null); // Tham chiếu đến trình soạn thảo

  useEffect(() => {
    // Chức năng giải mã token và lấy salesStaffId
    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const staffId = decoded.sub.split("_");
        setSalesStaffId(staffId[1]);
      }
    };
    decodeToken();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tạo FormData cho yêu cầu
    const data = new FormData();
    data.append("file", file); // Thêm tệp vào FormData
    data.append("description", editorRef.current.getContent()); // Lấy nội dung từ TinyMCE
    data.append("salesStaffId", salesStaffId); // Thêm salesStaffId đã giải mã

    try {
      const response = await CreateNews(data); // Gọi CreateNews với FormData
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="file-upload-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file-input">Choose an image:</label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {file && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(file)}
              alt="Selected"
              className="preview-image"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <Editor
            apiKey="9jhj4efz5nij36u8khbrkt7ik7reqfvvafwtcdaq4ww1s3qv"
            onInit={(evt, editor) => (editorRef.current = editor)} // Lưu tham chiếu đến editor
            init={{
              height: 300,
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
                "checklist",
                "mediaembed",
                "casechange",
                "export",
                "formatpainter",
                "pageembed",
                "a11ychecker",
                "tinymcespellchecker",
                "permanentpen",
                "powerpaste",
                "advtable",
                "advcode",
                "editimage",
                "advtemplate",
                "ai",
                "mentions",
                "tinycomments",
                "tableofcontents",
                "footnotes",
                "mergetags",
                "autocorrect",
                "typography",
                "inlinecss",
                "markdown",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
            }}
          />
        </div>

        <button type="submit" className="upload-button">
          Upload File
        </button>
      </form>
    </div>
  );
}

export default Maincontent;

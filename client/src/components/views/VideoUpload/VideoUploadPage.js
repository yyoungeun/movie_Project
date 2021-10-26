import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

// 종류 고정 값
const GenreOption = [
  { value: 0, label: "액션" },
  { value: 1, label: "로맨스" },
  { value: 2, label: "공포&스릴" },
  { value: 3, label: "판타지" },
];

function VideoUploadPage(props) {
  // store에 저장된 state값 호출
  const user = useSelector((state) => state.user);
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Genre, setGenre] = useState("액션");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onGenreChange = (e) => {
    setGenre(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    console.log("files", files);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log("uploadfiles success", response.data);

        // 성공 => 썸네일 노출
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.url);

        //thumbnail store
        Axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log("thumbnail success", response.data);
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
            console.log("Thumbnail", ThumbnailPath);
          } else {
            alert("썸네일 생성에 실패 했습니다.");
          }
        });
      } else {
        alert("비디오 업로드에 실패했습니다.");
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      genre: Genre,
      filePath: FilePath,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        message.success("성공적으로 업로드 했습니다.");

        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("비디오 업로드 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>VideoUpload</Title>
      </div>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <Icon
                  type="plus"
                  style={{ margin: "100px 120px", fontSize: "3rem" }}
                />
              </div>
            )}
          </Dropzone>
          {/* thumbnail */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>title</label>
        <br />
        <Input type="text" onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>description</label>
        <br />
        <TextArea onChange={onDescriptionChange} value={Description}></TextArea>
        <br />
        <br />
        <label>종류</label>
        <br />
        <select onChange={onGenreChange}>
          {GenreOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          등록하기
        </Button>
      </form>
    </div>
  );
}

export default VideoUploadPage;

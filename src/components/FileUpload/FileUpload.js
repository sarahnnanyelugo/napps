import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import ProfileAvater from "../../assets/images/edit-profile.png";

import "./file-upload.scss";
export function FileUpload(props) {
  const [images, setImages] = React.useState([]);
  const [img, setImg] = React.useState(null);
  const maxNumber = 69;
  const { colr, callBack, align } = props;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  useEffect(() => {
    if (!images[0]) {
      setImg(null);
      return;
    }
    setImg(images[0].data_url || null);
    CB(images[0].data_url || null);
  }, [images]);
  const CB = (img) => {
    callBack(img);
  };
  // useEffect(
  //   {
  //     CB,
  //   },
  //   [img]
  // );
  return (
    <>
      {/* <img src={img || ProfileAvater} /> */}

      <div className="file-input-div  " style={{ display: align }}>
        {" "}
        <span style={{ color: colr }} className="default-icon">
          {props.defaultIcon}
        </span>
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,

            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <button
                style={{ color: colr }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload {props.uploadable}
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item"></div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </>
  );
}

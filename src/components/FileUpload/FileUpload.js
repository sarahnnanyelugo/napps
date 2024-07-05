import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
import ProfileAvater from "../../assets/images/edit-profile.png";
import Icon from "../../assets/images/file-upload.png";

import "./file-upload.scss";
export function FileUpload(props) {
  const [images, setImages] = React.useState([]);
  const [img, setImg] = React.useState(null);
  const maxNumber = 69;
  const { colr, callBack } = props;
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

      <div className="file-input-div d-flex">
        {" "}
        <img src={props.defaultIcon} height="20px" width="20px" />
        <ImageUploading
          // multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            //   onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                // style={isDragging ? { color: "red" } : undefined}
                style={{ color: colr }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Upload {props.uploadable}
              </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  {/* <img src={image["data_url"]} alt="" width="100" /> */}
                  {/* <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Cancel</button>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        {/* <p>SVG, PNG, JPG or GIF (max. 800x400px)</p> */}
      </div>
    </>
  );
}

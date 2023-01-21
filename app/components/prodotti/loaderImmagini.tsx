import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = { maxNumber: number };
type TypeImageObject = {
  id: string;
  url: string;
};
function LoaderImmagini({ maxNumber }: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<{}[]>([]);
  const [deletingImage, setDeletingImage] = useState<string>("");

  useEffect(() => {
    if (!images.length) {
      setImageURL([]);
      setDeletingImage("");
    } else {
      createImageArray(images);
    }
  }, [images]);

  useEffect(() => {
    deleteImageFromArray();
  }, [deletingImage]);

  function onImageChange(e: Event | undefined) {
    const target = e?.target as HTMLInputElement;
    console.log("immagini", imageURL);
    setImages((prev) => {
      console.log("prev", prev);

      return target.files ? [...prev, target.files[0]] : [];
    });
  }

  function createImageArray(imageArray) {
    if (!imageArray.length) {
      return;
    }

    const newImageUrls: TypeImageObject[] = [];
    imageArray.forEach((image, index) => {
      const imageObject: TypeImageObject = {
        id: uuidv4(),
        url: URL.createObjectURL(image),
      };
      if (index <= maxNumber - 1) {
        return newImageUrls.push(imageObject);
      }
      return newImageUrls;
    });
    setImageURL(newImageUrls);
  }

  function deleteImageFromArray() {
    const imageToDeleteFromArray = imageURL?.findIndex(
      (item: TypeImageObject) => item.id === deletingImage
    );
    const updateImagesArray = images.filter((item, index) => {
      return index !== imageToDeleteFromArray;
    });

    setImages(updateImagesArray);
    setImageURL([]);
  }
  console.log(imageURL);
  console.log(images);

  return (
    <>
      <div className="wrapperImageHeader">
        <label htmlFor="immagine">Immagini</label>
        <input
          multiple
          id="immagine"
          type="file"
          accept="image/*"
          key={uuidv4()}
          onChange={onImageChange}
        />
      </div>
      <div className="wrapperImage">
        {imageURL?.length
          ? imageURL.map((item: TypeImageObject) => {
              return (
                <div key={item.id} className="wrapperSingleImage">
                  <img
                    src={item.url}
                    alt="imagePreview"
                    width={40}
                    height={40}
                  />
                  <span onClick={() => setDeletingImage(item.id)}>x</span>
                </div>
              );
            })
          : "nessuna immagine"}
      </div>
    </>
  );
}

export default LoaderImmagini;

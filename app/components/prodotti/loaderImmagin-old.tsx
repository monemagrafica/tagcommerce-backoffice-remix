import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { TypeImageObject } from "~/types/prodotti";

type Props = {
  maxNumber: number;
  immaginiPresenti?: TypeImageObject[];
  setImagesFromLoader?: Dispatch<SetStateAction<{}[] | undefined>>;
};

function LoaderImmagini({
  maxNumber,
  setImagesFromLoader,
  immaginiPresenti,
}: Props) {
  const [images, setImages] = useState<File[]>([]);
  const [imageURL, setImageURL] = useState<{}[]>([]);

  //NOTE - al caricamento del file
  function onImageChange(e: Event | undefined) {
    const target = e?.target as HTMLInputElement;
    setImages((prev) => {
      return target.files ? [...prev, target.files[0]] : [];
    });
  }
  //NOTE - crea l'array con l'immagine per la preview
  function createImageArray(imageArray) {
    if (!imageArray.length) {
      setImageURL([]);
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
  //NOTE - elimina l'immagine
  function deleteImageArray(index: number) {
    const updatedImages = images.filter((item, indexToFilter) => {
      return index !== indexToFilter;
    });
    setImages(updatedImages);
  }
  //NOTE - da attivare per sincronizzare con le immagini gia presenti
  /* useEffect(() => {
    immaginiPresenti && setImages(immaginiPresenti);
  }, [immaginiPresenti]);*/

  useEffect(() => {
    setImagesFromLoader && setImagesFromLoader(images);
    createImageArray(images);
  }, [images]);

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
          ? imageURL.map((item: TypeImageObject, index: number) => {
              return (
                <div key={item.id} className="wrapperSingleImage">
                  <img
                    src={item.url}
                    alt="imagePreview"
                    width={40}
                    height={40}
                  />
                  <span onClick={() => deleteImageArray(index)}>x</span>
                </div>
              );
            })
          : "nessuna immagine"}
      </div>
    </>
  );
}

export default LoaderImmagini;

import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = { maxNumber: number }
type TypeImageObject = {
    id: string,
    url: string
}
function LoaderImmagini({ maxNumber }: Props) {

    const [images, setImages] = useState([])
    const [imageURL, setImageURL] = useState<[] | undefined>([])
    const [deletingImage, setDeletingImage] = useState<string>('')

    useEffect(() => {

        if (images.length < 1) { setImageURL([]) }


        createImageArray(images)




    }, [images])

    useEffect(() => {
        const imageToDeleteFromArray = imageURL?.findIndex((item: TypeImageObject) => item.id === deletingImage)
        const updateImagesArray = images.filter((item, index) => {
            return index !== imageToDeleteFromArray

        })
        console.log('updateDelete', updateImagesArray);

        setImages(updateImagesArray)
    }, [deletingImage])


    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setImages((prev) => [...prev, e.target.files[0]])
    }

    function createImageArray(images) {

        if (!images.length) { return }

        const newImageUrls: TypeImageObject[] = []
        images.forEach((image, index) => {
            const imageObject: TypeImageObject = {
                id: uuidv4(),
                url: URL.createObjectURL(image)
            }
            if (index <= (maxNumber - 1)) { return newImageUrls.push(imageObject) }
            return newImageUrls
        })
        setImageURL(newImageUrls)
    }

    function deleteImageFromArray(imageId: string, arrayImage: [TypeImageObject]) {
        if (!arrayImage.length) { return }

        const updatedImageArray: [] = arrayImage.filter((item) => imageId !== item.id)
        setImages(updatedImageArray)
    }
    console.log('imageUrls', imageURL);

    return (
        <><div className="wrapperImageHeader">
            <label htmlFor="immagine">Immagini</label>
            <input multiple id="immagine" type="file" accept="image/*" onChange={onImageChange} />
        </div>
            <div className="wrapperImage">
                {imageURL.map((item: TypeImageObject) => {
                    return (
                        <div key={item.id} className='wrapperSingleImage'>
                            <img src={item.url} alt="imagePreview" width={40} height={40} />
                            <span onClick={() => setDeletingImage(item.id)}>x</span>
                        </div>)
                })}
            </div>
        </>
    )
};



export default LoaderImmagini
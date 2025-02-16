import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { ProductResponseData } from "../../../../../../../../types/products.types";
import postFileAPI from "../../../../../../../../utils/postFileAPI";
import CreateProductImageForm from "./CreateProductImageForm";


const UploadProductImage = (props: {
    productID: number,
    show: boolean,
    hideFunc: () => void,
    setProductData: Dispatch<SetStateAction<ProductResponseData | undefined>>,
}) => {

    // Form States
    const [isCreating, setIsCreating] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [uploadData, setUploadData] = useState<FileList>();

    const uploadDocument = () => {
        setHasSubmitted(true);
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        postFileAPI(`products/${props.productID}/upload_image`, {}, formData, (response: any) => {
            const productData: ProductResponseData = response.data;
            props.setProductData(productData);
            props.hideFunc();
        }, setIsCreating)
    }

    return (
        <WindowOverlay
            title={"Upload Image"} 
            maxWidth={300} 
            hideFunc={props.hideFunc} 
            show={props.show} 
            footer={<SubmitButton
                text="Upload Image"
                iconFont="add_photo_alternate"
                color="light-green"
                disabled={hasSubmitted}
                submitting={isCreating}
                submittingText="Uploading..."
                clickFunc={uploadDocument}
            />}
        >
            <CreateProductImageForm 
                setUploadData={setUploadData} 
                showErrors={hasSubmitted}
            />
        </WindowOverlay>
    )
}

export default UploadProductImage
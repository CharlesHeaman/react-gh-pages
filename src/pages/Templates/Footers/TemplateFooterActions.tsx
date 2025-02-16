import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import ImageUpload from "../../../components/form/Upload/ImageUpload";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { TemplateFooterResponseData } from "../../../types/templateFooter.types";
import postFileAPI from "../../../utils/postFileAPI";

const TemplateFooterActions = (props: {
    templateFooterID: number,
    hasImage: boolean,
    setTemplateFooterData: Dispatch<SetStateAction<TemplateFooterResponseData | undefined>>,
    setIsEditMode: () => void,
}) => {
    const [showUpload, setShowUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadData, setUploadData] = useState<FileList>();

    const uploadImage = () => {
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        postFileAPI(`template_footers/${props.templateFooterID}/upload_image`, {}, formData, (response: any) => {
            const templateFooterData = response.data;
            props.setTemplateFooterData(templateFooterData)
            setShowUpload(false);
        }, setIsUploading);
    }

    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton 
                    text="Edit Template Footer" 
                    color="orange" 
                    iconFont="edit" 
                    clickEvent={props.setIsEditMode}
                    />
                <SideBarButton 
                    text="Upload Image" 
                    iconFont="image" 
                    color={props.hasImage ? undefined : 'light-green'}
                    clickEvent={() => setShowUpload(true)}
                />
            </SideBarModule> 

            <WindowOverlay
                title='Upload Image'
                show={showUpload}
                hideFunc={() => setShowUpload(false)}
                maxWidth={300}
                footer={<SubmitButton
                    text="Upload Image"
                    submitting={isUploading}
                    submittingText='Uploading...'
                    iconFont="upload"
                    clickFunc={uploadImage}
                    disabled={!(uploadData && uploadData.length > 0)}
                />}
            >
                <p>This will replace the current image, if there is one.</p>
                <ImageUpload 
                    setter={setUploadData}
                />
            </WindowOverlay>

        </>
    )
}

export default TemplateFooterActions
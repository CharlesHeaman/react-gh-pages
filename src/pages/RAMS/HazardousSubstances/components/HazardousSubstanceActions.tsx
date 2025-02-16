import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ImageUpload from "../../../../components/form/Upload/ImageUpload"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { HazardousSubstanceResponseData } from "../../../../types/hazardousSubstance.types"
import postFileAPI from "../../../../utils/postFileAPI"
import putAPI from "../../../../utils/putAPI"

const HazardousSubstanceActions = (props: {
    hazardousSubstanceID: number,
    isInactive: boolean,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setHazardousSubstanceData: Dispatch<SetStateAction<HazardousSubstanceResponseData | undefined>>
}) => {
    const [showUpload, setShowUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showReactivate, setShowReactivate] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [uploadData, setUploadData] = useState<FileList>();

    const uploadImage = () => {
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        postFileAPI(`hazardous_substances/${props.hazardousSubstanceID}/upload_image`, {}, formData, (response: any) => {
            const hazardousSubstanceData = response.data;
            props.setHazardousSubstanceData(hazardousSubstanceData)
            setShowUpload(false);
        }, setIsUploading);
    }

    const deactivateHazardousSubstance = () => {
        putAPI(`hazardous_substances/${props.hazardousSubstanceID}/update`, {}, {
            is_active: false
        }, (response: any) => {
            const personnelProtectiveEquipmentData = response.data;
            props.setHazardousSubstanceData(personnelProtectiveEquipmentData);
            setShowDeactivate(false);
        }, setIsUpdating);
    }

    const reactivateHazardousSubstance = () => {
        putAPI(`hazardous_substances/${props.hazardousSubstanceID}/update`, {}, {
            is_active: true
        }, (response: any) => {
            const personnelProtectiveEquipmentData = response.data;
            props.setHazardousSubstanceData(personnelProtectiveEquipmentData);
            setShowReactivate(false);
        }, setIsUpdating);
    }

    return (
        <>
            <SideBarModule title="Actions">
                {!props.isEditMode ? 
                    !props.isInactive ?
                        <>
                            <SideBarButton 
                                text="Edit Hazardous Substance Details" 
                                iconFont="edit" 
                                color="orange" 
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                            <SideBarButton 
                                text="Upload Image" 
                                iconFont="image" 
                                color="" 
                                clickEvent={() => setShowUpload(true)}
                            />
                            <SideBarButton 
                                text="Deactivate Hazardous Substance" 
                                iconFont="highlight_off" 
                                color="red" 
                                clickEvent={() => setShowDeactivate(true)}
                            />
                        </> :
                        <SideBarButton
                            text="Reactivate Hazardous Substance"
                            iconFont="check_circle"
                            clickEvent={() => setShowReactivate(true)}
                        /> :
                    <SideBarButton
                        text="Abandon Edit"
                        iconFont="close"
                        clickEvent={() => props.setIsEditMode(false)}
                    />
                }
            </SideBarModule>

            <WindowOverlay
                title='Upload Image'
                show={showUpload}
                hideFunc={() => setShowUpload(false)}
                maxWidth={500}
            >
                <p>Upload hazardous substance image? This will replace the current image, if there is one.</p>
                <ImageUpload 
                    setter={setUploadData}
                />
                <SubmitButton
                    text="Upload Image"
                    submitting={isUploading}
                    submittingText='Uploading...'
                    clickFunc={uploadImage}
                    disabled={!(uploadData && uploadData.length > 0)}
                />
            </WindowOverlay>

            <WindowOverlay
                title={"Deactivate Hazardous Substance"} 
                maxWidth={400} 
                hideFunc={() => setShowDeactivate(false)} 
                show={showDeactivate} 
            >
                <p>All previous records of this hazardous substance will not be affected but no future records can be made.</p>
                <SubmitButton
                    text="Deactivate Hazardous Substance"
                    color="red"
                    submitting={isUpdating}
                    submittingText='Deactivating...'
                    clickFunc={deactivateHazardousSubstance}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={"Reactivate Hazardous Substance"} 
                maxWidth={400} 
                hideFunc={() => setShowReactivate(false)} 
                show={showReactivate} 
            >
                <p>The hazardous substance will be reactivated allowing future records to be made.</p>
                <SubmitButton
                    text="Reactivate Hazardous Substance"
                    color="light-green"
                    submitting={isUpdating}
                    submittingText='Reactivating...'
                    clickFunc={reactivateHazardousSubstance}
                />
            </WindowOverlay>
        </>
    )
}

export default HazardousSubstanceActions
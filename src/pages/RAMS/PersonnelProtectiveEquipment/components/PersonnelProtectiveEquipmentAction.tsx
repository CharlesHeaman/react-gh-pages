import { Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ImageUpload from "../../../../components/form/Upload/ImageUpload"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { PersonnelProtectiveEquipmentResponseData } from "../../../../types/personnelProtectiveEquipment.types"
import postFileAPI from "../../../../utils/postFileAPI"
import putAPI from "../../../../utils/putAPI"

const PersonnelProtectiveEquipmentActions = (props: {
    personnelProtectiveEquipmentID: number,
    isInactive: boolean,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setPersonnelProtectiveEquipmentData: Dispatch<SetStateAction<PersonnelProtectiveEquipmentResponseData | undefined>>
}) => {
    const [showUpload, setShowUpload] = useState(false);
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showReactivate, setShowReactivate] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadData, setUploadData] = useState<FileList>();

    const uploadImage = () => {
        const formData = new FormData() 
        uploadData && formData.append('upload', uploadData[0]);
        postFileAPI(`personnel_protective_equipment/${props.personnelProtectiveEquipmentID}/upload_image`, {}, formData, (response: any) => {
            const personnelProtectiveEquipmentData = response.data;
            props.setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData)
            setShowUpload(false);
        }, setIsUploading);
    }

    const deactivatePPE = () => {
        putAPI(`personnel_protective_equipment/${props.personnelProtectiveEquipmentID}/update`, {}, {
            is_active: false
        }, (response: any) => {
            const personnelProtectiveEquipmentData = response.data;
            props.setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData);
            setShowDeactivate(false);
        }, setIsUpdating);
    }

    const reactivatePPE = () => {
        putAPI(`personnel_protective_equipment/${props.personnelProtectiveEquipmentID}/update`, {}, {
            is_active: true
        }, (response: any) => {
            const personnelProtectiveEquipmentData = response.data;
            props.setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData);
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
                                text="Edit PPE Details" 
                                iconFont="edit" 
                                color="orange" 
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                            <SideBarButton 
                                text="Upload Image" 
                                iconFont="image" 
                                clickEvent={() => setShowUpload(true)}
                            />
                            <SideBarButton 
                                text="Deactivate PPE" 
                                iconFont="highlight_off" 
                                color="red" 
                                clickEvent={() => setShowDeactivate(true)}
                            />
                        </> : 
                        <SideBarButton
                            text="Reactivate PPE"
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
                <p>Upload personnel protective equipment image? This will replace the current image, if there is one.</p>
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
                title={"Deactivate Personnel Protective Equipment"} 
                maxWidth={400} 
                hideFunc={() => setShowDeactivate(false)} 
                show={showDeactivate} 
            >
                <p>All previous records of this personnel protective equipment will not be affected but no future records can be made.</p>
                <SubmitButton
                    text="Deactivate Personnel Protective Equipment"
                    color="red"
                    submitting={isUpdating}
                    submittingText='Deactivating...'
                    clickFunc={deactivatePPE}
                />
            </WindowOverlay>

            <WindowOverlay 
                title={"Reactivate Personnel Protective Equipment"} 
                maxWidth={400} 
                hideFunc={() => setShowReactivate(false)} 
                show={showReactivate} 
            >
                <p>The personnel protective equipment will be reactivated allowing future records to be made.</p>
                <SubmitButton
                    text="Reactivate Personnel Protective Equipment"
                    color="light-green"
                    submitting={isUpdating}
                    submittingText='Reactivating...'
                    clickFunc={reactivatePPE}
                />
            </WindowOverlay>
        </>
    )
}

export default PersonnelProtectiveEquipmentActions
import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import CompleteRequisition from "./CompleteRequisition";
import { RequisitionResponseData } from "../../../../../../../types/requisition.types";

const RequisitionActions = (props: {
    requisitionID: number,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setRequisitionData: Dispatch<SetStateAction<RequisitionResponseData | undefined>>
}) => {
    const [showComplete, setShowComplete] = useState(false);
    return (
        <>
            <SideBarModule title="Actions">
                <SideBarButton
                    text="Complete Requisition"
                    color="dark-blue"
                    iconFont="assignment_turned_in"
                    clickEvent={() => setShowComplete(true)}
                />
                <SideBarButton 
                    text='Edit Requisition Items'
                    color="orange"
                    iconFont='edit_note'
                    clickEvent={() => props.setIsEditMode(true)}
                />                
            </SideBarModule>

            <CompleteRequisition 
                requisitionID={props.requisitionID} 
                setRequisitionData={props.setRequisitionData}           
                show={showComplete} 
                hideFunc={() => setShowComplete(false)} 
            />
        </>
    )
}

export default RequisitionActions
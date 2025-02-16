import { Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { RequisitionResponseData } from "../../../../../../../types/requisition.types";
import putAPI from "../../../../../../../utils/putAPI";

const CompleteRequisition = (props: {
    requisitionID: number,
    setRequisitionData: Dispatch<SetStateAction<RequisitionResponseData | undefined>>
    show: boolean,
    hideFunc: () => void
}) => {

    const [isUpdating, setIsUpdating] = useState(false);
    
    const unassignVehicle = () => {
        putAPI(`requisitions/${props.requisitionID}/complete`, {}, {}, (response: any) => {
            const requisitionData: RequisitionResponseData = response.data;
            props.setRequisitionData(requisitionData);
            props.hideFunc();
        }, setIsUpdating)
    }
    
    return (
        <WindowOverlay
            title='Mark Requisition as Complete'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Complete Requisition"
                iconFont="assignment_turned_in"
                color="dark-blue"
                clickFunc={unassignVehicle}
                submitting={isUpdating}
                submittingText="Completing..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>This requisition will be assigned to the user and the product stock levels will be adjusted.</p>
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default CompleteRequisition
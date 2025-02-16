import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { EngineerEquipmentDetailsResponseData } from "../../../types/engineerEquipmentDetails.types"
import { TicketResponseData } from "../../../types/tickets.types"
import EngineerEquipmentDetailsActions from "./EngineerEquipmentDetailsActions"
import EngineerEquipmentDetailsAssociatedData from "./EngineerEquipmentDetailsAssociatedData"
import EngineerEquipmentDetailsSideBarSkeleton from "./EngineerEquipmentDetailsSideBarSkeleton"
import { EngineerEquipmentDetailsActivityCollectionResponse } from "../../../types/engineerEquipmentDetailsActivity.types"
import getAPI from "../../../utils/getAPI"
import ExportResource from "../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"

const EngineerEquipmentDetailsSideBar = (props: {
    engineerEquipmentDetails: EngineerEquipmentDetailsResponseData | undefined,
    ticket: TicketResponseData | undefined,
    setEngineerEquipmentDetails: Dispatch<SetStateAction<EngineerEquipmentDetailsResponseData | undefined>>,
}) => {
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<EngineerEquipmentDetailsActivityCollectionResponse>();

    useEffect(() => {
        if (props.engineerEquipmentDetails?.id === undefined) return;
        getActivity(props.engineerEquipmentDetails.id);
    }, [JSON.stringify(props.engineerEquipmentDetails)]);

    const getActivity = (engineerEquipmentDetailsID: number) => {
        getAPI(`engineer_equipment_details_activity`, {
            engineer_equipment_details_id: engineerEquipmentDetailsID,
            perPage: 1
        }, (response: any) => {
            const engineerEquipmentDetailsActivityData: EngineerEquipmentDetailsActivityCollectionResponse = response.data;
            setActivityData(engineerEquipmentDetailsActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isActivityLoading
    )

    return (
       !isSideBarLoading && props.engineerEquipmentDetails && props.ticket && activityData ? 
            <>
                <EngineerEquipmentDetailsActions
                    engineerEquipmentDetails={props.engineerEquipmentDetails}
                    ticket={props.ticket}
                    setEngineerEquipmentDetailsData={props.setEngineerEquipmentDetails}
                />
                <EngineerEquipmentDetailsAssociatedData
                    engineerEquipmentDetailsID={props.engineerEquipmentDetails.id}
                    activityCount={activityData.total_count}
                />
                <ExportResource
                    resourceData={props.engineerEquipmentDetails}
                    resourceName="Engineer Equipment Details"
                />
            </> 
            // Skeleton
            :
            <EngineerEquipmentDetailsSideBarSkeleton/>

    )
}

export default EngineerEquipmentDetailsSideBar
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { EngineerEquipmentDetailsCollectionResponse } from "../../../../../../../../types/engineerEquipmentDetails.types";
import getAPI from "../../../../../../../../utils/getAPI";
import EngineerEquipmentDetailsList from "../../../../../../../EngineerEquipmentDetails/EngineerEquipmentDetailsListPage/components/EngineerEquipmentDetailsList";

const TicketEquipmentDetails = (props: {
    tickets: Array<any>,
    departmentName: string,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isEngineerEquipmentDetailsLoading, setIsEngineerEquipmentDetailsLoading] = useState(true);
    const [engineerEquipmentDetailsData, setEngineerEquipmentDetailsData] = useState<EngineerEquipmentDetailsCollectionResponse>();

    // Search Parameters 
    const offset = searchParams.get('engineer_equipment_detailsOffset');
    const paramPerPage = searchParams.get('engineer_equipment_detailsPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    useEffect(() => {
        getRefrigerantMovements();
    }, [props.tickets, offset, perPage])

    const getRefrigerantMovements = () => {
        getAPI(`engineer_equipment_details`, {
            tickets: props.tickets,
            offset: offset,
            perPage: perPage,
        }, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsCollectionResponse = response.data;
            setEngineerEquipmentDetailsData(engineerEquipmentDetailsData);
        }, setIsEngineerEquipmentDetailsLoading)    
    } 

    return (
        <WindowOverlay 
            title={"Engineer Equipment Details"} 
            maxWidth={500} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <EngineerEquipmentDetailsList 
                isEngineerEquipmentDetailsLoading={isEngineerEquipmentDetailsLoading} 
                engineerEquipmentDetails={engineerEquipmentDetailsData} 
                departmentName={props.departmentName}
                perPage={perPage} 
                totalCount={props.totalCount}   
                hideTicket         
            />
        </WindowOverlay>
    )
}

export default TicketEquipmentDetails
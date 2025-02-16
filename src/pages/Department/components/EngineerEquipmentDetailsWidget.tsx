import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { EngineerEquipmentDetailsCollectionResponse } from "../../../types/engineerEquipmentDetails.types";
import getAPI from "../../../utils/getAPI";

const EngineerEquipmentDetailsWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [engineerEquipmentDetailsData, setEngineerEquipmentDetailsData] = useState<EngineerEquipmentDetailsCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return;
        getEngineerEquipmentDetails();
    }, [props.departmentID]);

    const getEngineerEquipmentDetails = () => {
        getAPI('engineer_equipment_details', {
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            is_processed: false,
            perPage: 1
        }, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsCollectionResponse = response.data;
            setEngineerEquipmentDetailsData(engineerEquipmentDetailsData);
        }, setIsDetailsLoading);
    }

    return (
        <DashboardWidget 
            title="Engineer Equipment Details"
            count={engineerEquipmentDetailsData?.total_count}
            text="Details that haven't been processed." 
            iconFont={"list_alt"}
            to="engineer_equipment_details"
        />
    )
}

export default EngineerEquipmentDetailsWidget;
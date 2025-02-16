import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EngineerEquipmentDetailsCollectionResponse } from "../../../types/engineerEquipmentDetails.types";
import getAPI from "../../../utils/getAPI";
import getEngineerEquipmentDetailsSearchParams from "../utils/getEngineerEquipmentDetailsSearchParams";
import EngineerEquipmentDetailsList from "./components/EngineerEquipmentDetailsList";
import EngineerEquipmentDetailsSearchHeader from "./components/EngineerEquipmentDetailsSearchHeader";

const EngineerEquipmentDetailsPage = () => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isDetailsLoading, setIsDetailsLoading] = useState(true);
    const [engineerEquipmentDetailsData, setEngineerEquipmentDetailsData] = useState<EngineerEquipmentDetailsCollectionResponse>();

    // Search Parameters 
    const engineerEquipmentDetailsSearchParams = getEngineerEquipmentDetailsSearchParams(searchParams);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        getEngineerEquipmentDetails();
    }, [departmentData, JSON.stringify(engineerEquipmentDetailsSearchParams)])

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const getEngineerEquipmentDetails = () => {
        if (departmentData === undefined) return;
        getAPI('engineer_equipment_details', {
            ...engineerEquipmentDetailsSearchParams,
            department_ids: [departmentData.id]
        }, (response: any) => {
            const engineerEquipmentDetailsData: EngineerEquipmentDetailsCollectionResponse = response.data;
            setEngineerEquipmentDetailsData(engineerEquipmentDetailsData);
        }, setIsDetailsLoading)
    }

    return (
        <OuterContainer
            title='Engineer Equipment Details'
            description="Process equipment details recorded by engineers."
            maxWidth={1200}
            noBorder
        >
            <EngineerEquipmentDetailsSearchHeader/>
            <EngineerEquipmentDetailsList 
                isEngineerEquipmentDetailsLoading={isDetailsLoading} 
                engineerEquipmentDetails={engineerEquipmentDetailsData} 
                departmentName={departmentName as string}
                perPage={engineerEquipmentDetailsSearchParams.perPage} 
            />
        </OuterContainer>
    )
}

export default EngineerEquipmentDetailsPage
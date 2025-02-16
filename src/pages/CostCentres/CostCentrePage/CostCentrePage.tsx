import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { CostCentreActivityCollectionResponse, CostCentreActivityResponseData } from "../../../types/costCentreActivity.types";
import { CostCentreResponseData } from "../../../types/costCentres.types";
import { DepartmentResponseData } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import CostCentreInformation from "./components/CostCentreInformation";
import CostCentreInformationSkeleton from "./components/CostCentreInformationSkeleton";
import CostCentreSideBar from "./components/CostCentreSideBar/CostCentreSideBar";
import EditCostCentreForm from "./components/EditCostCentreForm";

const CostCentrePage = () => {
    const { costCentreID } = useParams();

    // Data States
    const [isCostCentreLoading, setIsCostCentreLoading] = useState(true);
    const [costCentreData, setCostCentreData] = useState<CostCentreResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<CostCentreActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getCostCentreData();
    }, [costCentreID])

    useEffect(() => {
        if (costCentreData === undefined) return;
        costCentreData.data.department_id && getDepartment(costCentreData.data.department_id);
    }, [costCentreData?.data.department_id]);

    useEffect(() => {
        if (costCentreData === undefined) return;
        if (!costCentreData.data.is_active) getInactiveActivity(costCentreData.id);
    }, [JSON.stringify(costCentreData)]);

    const getCostCentreData = () => {
        getAPI(`cost_centres/${costCentreID}`, {}, (response: any) => {
            const costCentreData: CostCentreResponseData = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentreLoading);
    }

    const getDepartment = (departmentID: number) => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getInactiveActivity = (costCentreID: number) => {
        getAPI(`cost_centre_activity`, {
            cost_centre_id: costCentreID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: CostCentreActivityCollectionResponse = response.data;
            setInactiveActivityData(costCentreActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isCostCentreLoading || 
        isDepartmentLoading ||
        isInactiveActivityLoading
    )

    return (
        <OuterContainer 
            title='Cost Centre' 
            id={costCentreID as string}
            headerContent={costCentreData && !costCentreData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={800}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && costCentreData ?
                        !isEditMode ?
                            <CostCentreInformation
                                costCentreData={costCentreData.data}
                                department={departmentData}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> : 
                            <EditCostCentreForm
                                costCentre={costCentreData}
                                setCostCentreData={setCostCentreData}
                                department={departmentData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <CostCentreInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <CostCentreSideBar 
                        costCentre={costCentreData}
                        setCostCentreData={setCostCentreData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        showVehicles={costCentreData?.data.associated_resource_type === 3}
                    />                    
                </div>
            </div> 
        </OuterContainer> 
    )
}

export default CostCentrePage
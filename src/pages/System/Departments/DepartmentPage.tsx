import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { DepartmentResponseData } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import DepartmentInformation from "./DepartmentInformation";
import DepartmentInformationSkeleton from "./DepartmentInformationSkeleton";
import DepartmentSideBar from "./DepartmentSideBar/DepartmentSideBar";
import EditDepartmentForm from "./DepartmentPage/components/EditDepartmentForm";
import { DepartmentActivityCollectionResponse, DepartmentActivityResponseData } from "../../../types/departmentActivity.types";

const DepartmentPage = () => {
    const { departmentID } = useParams();

    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<DepartmentActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getDepartment();
    }, [departmentID]);

    useEffect(() => {
        if (departmentData === undefined) return;
        if (!departmentData.data.is_active) getInactiveActivity(departmentData.id);
    }, [JSON.stringify(departmentData)]);

    const getDepartment = () => {
        getAPI(`departments/${departmentID}`, {}, (response: any) => {
            const departmentData: DepartmentResponseData = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading)
    }

    const getInactiveActivity = (departmentID: number) => {
        getAPI(`department_activity`, {
            department_id: departmentID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const departmentActivityData: DepartmentActivityCollectionResponse = response.data;
            setInactiveActivityData(departmentActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isDepartmentLoading 
    )

    return (
        <>
            <OuterContainer
                title='Department'
                id={departmentID}
                headerContent={departmentData && !departmentData.data.is_active ? 
                    <InactiveLabel/> : 
                    null
                }
                maxWidth={900}
            >
                <div className="page-grid">
                    <div className="page-main">
                        {!isLoading && departmentData ? 
                            !isEditMode ? 
                                <DepartmentInformation
                                    department={departmentData}
                                    lastDeactivate={inactiveActivityData?.data.created_at}
                                /> : 
                                <EditDepartmentForm
                                    department={departmentData}
                                    setDepartmentData={setDepartmentData}
                                    disabledEdit={() => setIsEditMode(false)}
                                />
                            :
                            <DepartmentInformationSkeleton/>
                        }
                    </div>
                    <div className="page-side">
                        <DepartmentSideBar 
                            department={departmentData} 
                            setDepartmentData={setDepartmentData}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}    
                        />
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default DepartmentPage
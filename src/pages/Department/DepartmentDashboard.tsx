import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import getAPI from "../../utils/getAPI";
import DashboardWidgets from "./DashboardWidgets";

const DepartmentDashboard = () => {
    const { departmentName } = useParams();

    // Data States 
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    
    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartment = departmentData.data[0];
            setDepartmentData(currentDepartment);
        }, setIsDepartmentLoading);
    }

    return (
        <>
            <OuterContainer
                title={`${(departmentName as string).charAt(0).toUpperCase() + (departmentName as string).slice(1)} Dashboard`}
                maxWidth={1300}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <DashboardWidgets departmentID={departmentData?.id}/>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default DepartmentDashboard
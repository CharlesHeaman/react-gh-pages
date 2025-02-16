import { useEffect, useState } from "react";
import DashboardWrapper from "../../components/ui/Containers/DashboardWrapper/DashboardWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import DashboardNavigation from "../../components/ui/DashboardWidget/DashboardNavigation";
import { DepartmentCollectionResponse } from "../../types/department.types";
import getAPI from "../../utils/getAPI";
import DashboardWidgets from "./DashboardWidgets";

const GeneralDashboard = () => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentsData, setDepartmentsData] = useState<DepartmentCollectionResponse>();

    useEffect(() => {
        getDepartments();
    }, [])

    const getDepartments = () => {
        getAPI('departments', {
            is_active: true,
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentsData(departmentData);
        }, setIsDepartmentsLoading);
    }

    return (
        <OuterContainer
            title="General Dashboard"
            maxWidth={1300}
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    {!isDepartmentsLoading && departmentsData && departmentsData.data.length > 0 ?
                        <section>
                            <h2>Departments</h2>
                            <DashboardWrapper>
                                {departmentsData.data.map(department => {
                                    return (
                                        <DashboardNavigation 
                                            key={department.id}
                                            title={department.data.name}
                                            to={department.data.name}
                                            hex={department.data.label_color}
                                            text="View department dashboard."
                                            iconFont="dashboard"
                                        />
                                    )
                                })}
                            </DashboardWrapper>
                        </section>
                    : null}
                    <DashboardWidgets departmentID={null}/>
                </div>
            </div>
        </OuterContainer>
    )
}

export default GeneralDashboard
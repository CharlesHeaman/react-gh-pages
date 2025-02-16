import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { DepartmentCollectionResponse } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import DepartmentSearchHeader from './DepartmentSearchHeader';
import DepartmentList from './DepartmentsList';
import getDepartmentSearchParams from './utils/getDepartmentSearchParams';

const DepartmentsListPage = () => {
    const [searchParams] = useSearchParams();
    
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(true);
    const [departmentsData, setDepartmentsData] = useState<DepartmentCollectionResponse>();

    const departmentSearchParams = getDepartmentSearchParams(searchParams);

    useEffect(() => {
        searchDepartments();
    }, [JSON.stringify(departmentSearchParams)]);

    const searchDepartments = () => {
        getAPI('departments', departmentSearchParams, (response: any) => {
            const departmentsData: DepartmentCollectionResponse = response.data;
            setDepartmentsData(departmentsData);
        }, setIsDepartmentsLoading)
    }

    return (
        <OuterContainer
            title='Departments'
            description='Create, edit and deactivate departments. Manage department rates. Enable and disable department specific modules.'
            maxWidth={1400}
            noBorder
        >
            <DepartmentSearchHeader/>
            <DepartmentList
                isDepartmentsLoading={isDepartmentsLoading}
                departmentData={departmentsData}
                perPage={departmentSearchParams.perPage}
            />
        </OuterContainer>
    )
}

export default DepartmentsListPage
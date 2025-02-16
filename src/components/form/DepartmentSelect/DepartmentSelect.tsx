import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";

const DepartmentSelect = (props: {
    selectedDepartment: DepartmentResponseData | undefined,
    setSelectedDepartment: Dispatch<SetStateAction<DepartmentResponseData | undefined>>,
    updateFunc?: (department: DepartmentResponseData) => void
    required?: boolean,
    hasSubmitted: boolean
}) => {

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

    const showRequired = props.selectedDepartment === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="dashboard"
                resourceName="department"
                resourceNamePlural="departments"
                selectedText={props.selectedDepartment?.data.name}
                selectItems={departmentsData ? departmentsData.data.map(department => {
                    return {
                        text: department.data.name,
                        clickFunc: () => {
                            props.setSelectedDepartment(department);
                            props.updateFunc && props.updateFunc(department);
                        },
                        selected: props.selectedDepartment?.id === department.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Department is required`}
                show={showRequired}
            />}

        </>
    )
}

export default DepartmentSelect
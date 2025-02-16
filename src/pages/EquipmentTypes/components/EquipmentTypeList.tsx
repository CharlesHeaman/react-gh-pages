import { useEffect, useState } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";
import { EquipmentTypeCollectionResponse, EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import findDepartment from "../../../utils/findDepartment";
import getAPI from "../../../utils/getAPI";
import EquipmentTypeRow from "./EquipmentTypeRow";
import EquipmentTypeRowSkeleton from "./EquipmentTypeRowSkeleton";

const EquipmentTypeList = (props: {
    isEquipmentTypesLoading: boolean,
    equipmentTypes: EquipmentTypeCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideDepartment?: boolean,
    hideEnergySource?: boolean,
    showAdd?: boolean,
    addFunc?: (product: EquipmentTypeResponseData) => void,
}) => {
    // Data States
    const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<Array<DepartmentResponseData>>([]);
    
    // Resource Constants
    const resourceName = "equipment_types";
    const resourceIcon = "local_laundry_service";

    useEffect(() => {
        !props.hideDepartment && setIsDepartmentsLoading(true);
    }, [props.isEquipmentTypesLoading])

    useEffect(() => {
        if (props.equipmentTypes && props.equipmentTypes.data.length > 0) {
            !props.hideDepartment && getDepartments([...new Set(props.equipmentTypes.data.flatMap(equipmentType => equipmentType.data.department_ids))]);
        } else {
            !props.hideDepartment && setIsDepartmentsLoading(false);
        }
    }, [props.equipmentTypes])

    const getDepartments = (departmentIDs: Array<number | null>) => {
        getAPI('departments', {
            ids: departmentIDs
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData.data);
        }, setIsDepartmentsLoading);
    }

    const isLoading = (
        props.isEquipmentTypesLoading ||
        isDepartmentsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Name', 'Department', 'Certification Body', 'Service Time', 'Master', 'Slave Quantity', 'Slave'];
        if (props.hideDepartment) {
            var headerIndex = tableHeader.indexOf('Department');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideEnergySource) {
            var headerIndex = tableHeader.indexOf('Certification');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.showAdd) tableHeader.unshift('');
        return tableHeader
    }

    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.equipmentTypes)}
                skeletonRow={<EquipmentTypeRowSkeleton hideDepartment={props.hideDepartment} hideEnergySource={props.hideEnergySource}/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.equipmentTypes ? props.equipmentTypes.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.equipmentTypes && props.equipmentTypes.data.map((equipmentType, index) => 
                    <EquipmentTypeRow 
                        equipmentType={equipmentType}
                        departments={departmentData}
                        hideDepartment={props.hideDepartment}
                        hideEnergySource={props.hideEnergySource}
                        showAdd={props.showAdd}
                        addFunc={props.addFunc}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.equipmentTypes) && <PaginationNavigation
                data={props.equipmentTypes.data}
                totalCount={props.equipmentTypes.total_count}
                perPage={props.equipmentTypes.pages.per_page}
                resourceName={resourceName}
                prefix={resourceName}  
            />}
        </div>
    )
}

export default EquipmentTypeList
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import Header from "../../../components/ui/Structure/Header/Header";
import { EquipmentTypeResponseData } from "../../../types/equipmentType.types";
import getAPI from "../../../utils/getAPI";
import EquipmentTypeInformation from "./components/EquipmentTypeInformation";
import EquipmentTypeInformationSkeleton from "./components/EquipmentTypeInformationSkeleton";
import EquipmentTypeSideBar from "./components/EquipmentTypeSideBar";
import EditEquipmentTypeForm from "./EditEquipmentTypeForm";
import { EquipmentTypeActivityCollectionResponse, EquipmentTypeActivityResponseData } from "../../../types/equipmentTypeActivity.types";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../../types/department.types";

const EquipmentTypePage = () => {
    const { equipmentTypeID } = useParams();

    // Data States
    const [isEquipmentTypeLoading, setIsEquipmentTypeLoading] = useState(true);
    const [equipmentTypeData, setEquipmentTypeData] = useState<EquipmentTypeResponseData>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
    const [departmentData, setDepartmentData] = useState<DepartmentCollectionResponse>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<EquipmentTypeActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getEquipmentTypeData();
    }, [equipmentTypeID]);

    useEffect(() => {
        if (equipmentTypeData === undefined) return;
        equipmentTypeData.data.department_ids && getDepartmentS(equipmentTypeData.data.department_ids);
    }, [JSON.stringify(equipmentTypeData?.data.department_ids)]);

    useEffect(() => {
        if (equipmentTypeData === undefined) return;
        if (!equipmentTypeData.data.is_active) getInactiveActivity(equipmentTypeData.id);
    }, [JSON.stringify(equipmentTypeData)]);

    const getEquipmentTypeData = () => {
        getAPI(`equipment_types/${equipmentTypeID}`, {}, (response: any) => {
            const equipmentTypeData: EquipmentTypeResponseData = response.data;
            setEquipmentTypeData(equipmentTypeData);
        }, setIsEquipmentTypeLoading);
    }

    const getDepartmentS = (departmentIDs: Array<number>) => {
        getAPI('departments', {
            ids: departmentIDs,
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            setDepartmentData(departmentData);
        }, setIsDepartmentLoading);
    }

    const getInactiveActivity = (equipmentTypeID: number) => {
        getAPI(`equipment_type_activity`, {
            equipment_type_id: equipmentTypeID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: EquipmentTypeActivityCollectionResponse = response.data;
            setInactiveActivityData(costCentreActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isEquipmentTypeLoading ||
        isDepartmentLoading ||
        isInactiveActivityLoading
    )

    return (
        <OuterContainer 
            title='Equipment Type' 
            id={equipmentTypeID as string}
            headerContent={equipmentTypeData && !equipmentTypeData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={1000}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && equipmentTypeData && departmentData ?
                        !isEditMode ?
                            <EquipmentTypeInformation
                                equipmentType={equipmentTypeData}
                                departments={departmentData}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> : 
                            <EditEquipmentTypeForm
                                equipmentType={equipmentTypeData}
                                departments={departmentData.data}
                                setEquipmentTypeData={setEquipmentTypeData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <EquipmentTypeInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <EquipmentTypeSideBar 
                        equipmentType={equipmentTypeData}
                        setEquipmentTypeData={setEquipmentTypeData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />                    
                </div>
            </div> 
        </OuterContainer> 
    )
}

export default EquipmentTypePage
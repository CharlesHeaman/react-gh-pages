import { useEffect, useState } from "react";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { EquipmentCollectionResponse } from "../../../../types/equipment.types";
import { EquipmentTypeCollectionResponse, EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import getAPI from "../../../../utils/getAPI";
import EquipmentTypeSummaryRow from "../../../EquipmentTypes/components/EquipmentTypeSummaryRow";
import EquipmentTypeSummaryRowSkeleton from "../../../EquipmentTypes/components/EquipmentTypeSummaryRowSkeleton";
import filterEquipmentTypeEquipment from "../../Customers/CustomerPage/components/CustomerSideBar/components/CustomerReports/utils/filterEquipmentTypeEquipment";

const EquipmentTypeSummaryList = (props: {
    isEquipmentLoading: boolean,
    equipment: EquipmentCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(false);
    const [equipmentTypesData, setEquipmentTypesData] = useState<Array<EquipmentTypeResponseData>>([]);

    useEffect(() => {
        setIsEquipmentTypesLoading(true);
    }, [props.isEquipmentLoading])

    useEffect(() => {
        if (props.equipment && props.equipment.data.length > 0) {
            getEquipmentTypes([...new Set(props.equipment.data.map(equipment => equipment.data.equipment_type_id))]);
        } else {
            setIsEquipmentTypesLoading(false);
        }
    }, [props.equipment])

    const getEquipmentTypes = (equipmentTypeIDs: Array<number | null>) => {
        const idsArray = equipmentTypeIDs.filter(equipmentTypeID => equipmentTypeID !== null);
        getAPI('equipment_types', {
            ids: idsArray.length > 0 ? idsArray : [-1],
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypesData(equipmentTypeData.data);
        }, setIsEquipmentTypesLoading);
    }

    const isLoading = (
        props.isEquipmentLoading || 
        isEquipmentTypesLoading
    )
    
    return (
        <div>
            <SearchTable
                headers={['Equipment Type', 'Quantity']}
                isLoading={!(!isLoading && props.equipment && equipmentTypesData)}
                skeletonRow={<EquipmentTypeSummaryRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.equipment ? props.equipment.data.length : 0}
                resourceName="equipment"
                resourceIconFont="local_laundry_service"
                body={<>
                    {equipmentTypesData && equipmentTypesData.map((equipmentType, index) => 
                        <EquipmentTypeSummaryRow 
                            equipmentType={equipmentType}
                            quantity={props.equipment ? filterEquipmentTypeEquipment(props.equipment.data, equipmentType.id).length : 0}
                            key={index}
                        />  
                    )}
                    {/* Unknown */}
                    <EquipmentTypeSummaryRow 
                        equipmentType={undefined}
                        quantity={props.equipment ? filterEquipmentTypeEquipment(props.equipment.data, null).length : 0}
                    />  
                </>
                }
                footer={<tr>
                        <td></td>
                        <th>{props.equipment?.data.length}</th>
                </tr>}
            />
        </div>
    )
}

export default EquipmentTypeSummaryList
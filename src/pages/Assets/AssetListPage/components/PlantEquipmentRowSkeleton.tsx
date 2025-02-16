import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const PlantEquipmentRowSkeleton = (props: {
    hideAssignedTo?: boolean,
    hideType?: boolean,
    hideManufacturer?: boolean,
    hidePATestingDue?: boolean,
    hideCalibrationDue?: boolean,
    hideInspectionDue?: boolean,
    hideMaintenanceDue?: boolean,
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={85}/></td>
            <td><Skeleton type='label' width={220}/></td>
            {!props.hideManufacturer ? 
                <td><Skeleton type='label' width={220}/></td>
                : null
            }
            <td><Skeleton type='label' width={220}/></td>
            {!props.hideType ? 
                <td><Skeleton type='label' width={190}/></td>
                : null 
            }
            {!props.hidePATestingDue && <td><Skeleton type='label' width={120}/></td>}
            {!props.hideCalibrationDue && <td><Skeleton type='label' width={120}/></td>}
            {!props.hideInspectionDue && <td><Skeleton type='label' width={120}/></td>}
            {!props.hideMaintenanceDue && <td><Skeleton type='label' width={120}/></td>}
            {!props.hideAssignedTo ? 
                <td><Skeleton type='label' width={145}/></td> 
                : null
            }
        </tr>
    )
}

export default PlantEquipmentRowSkeleton
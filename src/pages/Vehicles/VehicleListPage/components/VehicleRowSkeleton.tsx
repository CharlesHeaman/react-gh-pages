import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const VehicleRowSkeleton = (props: {
    hideAssignedTo?: boolean,
    hideCostCentre?: boolean,
}) => {
    return (
        <tr>
            <td><Skeleton type="label" width={95}/></td>
            <td><Skeleton type="label" width={85}/></td>
            <td><Skeleton type="label" width={85}/></td>
            <td><Skeleton type="label" width={85}/></td>
            <td><Skeleton type="label" width={85}/></td>
            <td><Skeleton type="label" width={85}/></td>
            {!props.hideAssignedTo ? 
                <td><Skeleton type="label" width={180}/></td>
                : null
            }
            {!props.hideCostCentre ? 
                <td><Skeleton type="label" width={190}/></td>
                : null
            }
        </tr>
    )
}

export default VehicleRowSkeleton
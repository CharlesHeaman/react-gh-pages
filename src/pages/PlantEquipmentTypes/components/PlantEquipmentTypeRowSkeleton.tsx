import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const PlantEquipmentTypeRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={230}/></td>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={100}/></td>
        </tr>
    )
}

export default PlantEquipmentTypeRowSkeleton
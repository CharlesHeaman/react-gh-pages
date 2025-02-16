import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const EquipmentTypeSummaryRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={250}/></td>
            <td><Skeleton type='label' width={65}/></td>
        </tr>
    )
}

export default EquipmentTypeSummaryRowSkeleton

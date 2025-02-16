import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const PurchaseOrderLineRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={85}/></td>
            <td><Skeleton type='label' width={180}/></td>
            <td><Skeleton type='label' width={450}/></td>
            <td><Skeleton type='label' width={40}/></td>
            <td><Skeleton type='label' width={65}/></td>
            <td><Skeleton type='label' width={65}/></td>
        </tr>
    )
}

export default PurchaseOrderLineRowSkeleton
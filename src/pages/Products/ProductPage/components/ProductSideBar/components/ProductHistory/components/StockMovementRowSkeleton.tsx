import Skeleton from "../../../../../../../../components/ui/General/Skeleton/Skeleton"

const StockMovementRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={180}/></td>
            <td><Skeleton type="label" width={600}/></td>
            <td><Skeleton type="label" width={185}/></td>
        </tr>
    )
}

export default StockMovementRowSkeleton
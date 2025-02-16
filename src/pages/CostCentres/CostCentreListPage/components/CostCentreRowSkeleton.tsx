import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const CostCentreRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={265}/></td>
            <td><Skeleton type="label" width={120}/></td>
            <td><Skeleton type="label" width={120}/></td>
        </tr>
    )
}

export default CostCentreRowSkeleton
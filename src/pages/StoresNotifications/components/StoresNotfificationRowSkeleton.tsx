import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const VanStockRequestRowSkeleton = (props: {
    hideTicket?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type="label" width={85}/></td>
            {!props.hideTicket ? <td><Skeleton type="label" width={75}/></td> : null}
            {!props.hideTicket ? <td><Skeleton type='label' width={400}/></td> : null}
            <td><Skeleton type="label" width={220}/></td>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={35}/></td>
        </tr>
    )
}

export default VanStockRequestRowSkeleton
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const GasBottleRowSkeleton = (props: {
    hideRefrigerant?: boolean,
    hideAssignedTo?: boolean,
    hideSupplier?: boolean,
    hideStatus?: boolean,
    isConsumable?: boolean,
    isReturn?: boolean,
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={65}/></td>
            <td><Skeleton type='label' width={80}/></td>
            {!props.isConsumable ? <td><Skeleton type='label' width={35}/></td> : null}
            <td><Skeleton type='label' width={105}/></td>
            {!props.hideSupplier ? <td><Skeleton type='label' width={345}/></td> : null}
            {!props.hideRefrigerant ? <td><Skeleton type='label' width={80}/></td> : null}
            {!props.isConsumable ? <td><Skeleton type='label' width={85}/></td> : null}
            {!props.hideAssignedTo && !props.isReturn ? <td><Skeleton type='label' width={135}/></td> : null}
            {!props.hideStatus && !props.isReturn ? <td><Skeleton type='label' width={120}/></td> : null}
        </tr>
    )
}

export default GasBottleRowSkeleton
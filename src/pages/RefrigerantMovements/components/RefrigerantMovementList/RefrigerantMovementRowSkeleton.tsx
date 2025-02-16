import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const RefrigerantMovementRowSkeleton = (props: {
    isConsumable?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={180}/></td>
            {!props.isConsumable ? <td><Skeleton type="label" width={60}/></td> : null}
            <td><Skeleton type="label" width={180}/></td>
            <td><Skeleton type="label" width={185}/></td>
        </tr>
    )
}

export default RefrigerantMovementRowSkeleton
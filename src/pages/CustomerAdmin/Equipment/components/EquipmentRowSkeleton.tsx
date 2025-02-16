import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const EquipmentRowSkeleton = (props: {
    hideSite?: boolean,
    hideType?: boolean,
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={100}/></td>
            {!props.hideSite ? <td><Skeleton type='label' width={300}/></td> : null}
            {!props.hideType ? <td><Skeleton type='label'/></td> : null}
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={200}/></td>
        </tr>
    )
}

export default EquipmentRowSkeleton
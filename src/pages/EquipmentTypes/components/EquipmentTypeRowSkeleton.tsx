import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const EquipmentTypeRowSkeleton = (props: {
    hideDepartment?: boolean,
    hideEnergySource?: boolean,
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={250}/></td>
            {!props.hideDepartment ? <td><Skeleton type='label' width={105}/></td> : null}
            {!props.hideEnergySource ? <td><Skeleton type='label' width={110}/></td> : null}
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={90}/></td>
            <td><Skeleton type='label' width={60}/></td>
        </tr>
    )
}

export default EquipmentTypeRowSkeleton
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const ContractRowSkeleton = (props: {
    hideCustomer?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={370}/></td>
            {!props.hideCustomer ? <td><Skeleton type='label' width={485}/></td> : null}
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={55}/></td>
        </tr>
    )
}

export default ContractRowSkeleton
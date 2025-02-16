import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const SiteRowSkeleton = (props: {
    hideContract?: boolean,
    hideCustomer?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={100}/></td>
            {!props.hideCustomer ? <td><Skeleton type='label' width={480}/></td> : null}
            <td><Skeleton type='label' width={265}/></td>
            <td><Skeleton type='label' width={70}/></td>
            <td><Skeleton type='label' width={230}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={75}/></td>
            {!props.hideContract ?
                <td><Skeleton type='label' width={125}/></td> :
                null
            }
            <td><Skeleton type='label' width={75}/></td>
        </tr>
    )
}

export default SiteRowSkeleton
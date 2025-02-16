import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const PurchaseOrderRowSkeleton = (props: {
    hideSupplier?: boolean,
    hideType?: boolean
    hideCustomer?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={80}/></td>
            {!props.hideType && <td><Skeleton type='label' width={95}/></td>}
            <td><Skeleton type='label' width={140}/></td>
            {!props.hideSupplier ? <td><Skeleton type='label' width={490}/></td> : null}
            {!props.hideCustomer ? <td><Skeleton type='label' width={490}/></td> : null}
            <td><Skeleton type='label' width={90}/></td>
            <td><Skeleton type='label' width={126}/></td>
        </tr>
    )
}

export default PurchaseOrderRowSkeleton
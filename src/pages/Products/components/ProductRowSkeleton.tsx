import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const ProductRowSkeleton = (props: {
    hideCategory?: boolean,
    hideSupplier?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={95}/></td>
            {!props.hideCategory ? <td><Skeleton type='label' width={150}/></td> : null}
            <td><Skeleton type='label' width={280}/></td>
            <td><Skeleton type='label' width={280}/></td>
            <td><Skeleton type='label' width={30}/></td>
            {!props.hideSupplier ? <td><Skeleton type='label' width={380}/></td> : null}
            <td><Skeleton type='label' width={80}/></td>
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={60}/></td>
            <td><Skeleton type='label' width={80}/></td>
        </tr>
    )
}

export default ProductRowSkeleton
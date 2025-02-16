import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const CustomerRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={110}/></td>
            <td><Skeleton type='label' width={460}/></td>
            <td><Skeleton type='label' width={135}/></td>
            <td><Skeleton type='label' width={135}/></td>
            <td><Skeleton type='label' width={50}/></td>
            <td><Skeleton type='label' width={50}/></td>
            <td><Skeleton type='label' width={50}/></td>
            <td><Skeleton type='label' width={50}/></td>
        </tr>
    )
}

export default CustomerRowSkeleton
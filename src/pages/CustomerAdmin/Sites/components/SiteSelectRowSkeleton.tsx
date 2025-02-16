import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const SiteSelectRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={50}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={265}/></td>
            <td><Skeleton type='label' width={70}/></td>
            <td><Skeleton type='label' width={230}/></td>
            <td><Skeleton type='label' width={100}/></td>
        </tr>
    )
}

export default SiteSelectRowSkeleton
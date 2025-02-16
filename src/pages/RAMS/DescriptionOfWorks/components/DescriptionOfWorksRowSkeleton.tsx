import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const DescriptionOfWorksRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={600}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={85}/></td>
        </tr>
    )
}

export default DescriptionOfWorksRowSkeleton
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const AdditionalTimeRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={150}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={95}/></td>
        </tr>
    )
}

export default AdditionalTimeRowSkeleton
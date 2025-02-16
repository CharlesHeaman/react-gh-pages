import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const DepartmentRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={145}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={45}/></td>
            <td><Skeleton type="label" width={130}/></td>
            <td><Skeleton type="label" width={130}/></td>
            <td><Skeleton type="label" width={130}/></td>
            <td><Skeleton type="label" width={130}/></td>
            <td><Skeleton type="label" width={130}/></td>
        </tr>
    )
}

export default DepartmentRowSkeleton
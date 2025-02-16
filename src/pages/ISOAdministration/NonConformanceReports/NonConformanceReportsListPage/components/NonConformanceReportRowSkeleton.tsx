import Skeleton from "../../../../../components/ui/General/Skeleton/Skeleton"

const NonConformanceReportRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={105}/></td>
            <td><Skeleton type='label' width={500}/></td>
            <td><Skeleton type='label' width={34}/></td>
            <td><Skeleton type='label' width={800}/></td>
            <td><Skeleton type='label' width={85}/></td>
            <td><Skeleton type='label' width={34}/></td>
        </tr>
    )
}

export default NonConformanceReportRowSkeleton
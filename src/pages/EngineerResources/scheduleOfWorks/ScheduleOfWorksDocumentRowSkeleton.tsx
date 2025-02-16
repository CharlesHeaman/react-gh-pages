import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const ScheduleOfWorksRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={700}/></td>
            <td><Skeleton type='label' width={80}/></td>
            <td><Skeleton type='label' width={32}/></td>
        </tr>
    )
}

export default ScheduleOfWorksRowSkeleton
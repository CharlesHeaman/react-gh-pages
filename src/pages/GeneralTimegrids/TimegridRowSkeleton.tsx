import Skeleton from "../../components/ui/General/Skeleton/Skeleton"

const TimegridRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={34}/></td>
        </tr>
    )
}

export default TimegridRowSkeleton
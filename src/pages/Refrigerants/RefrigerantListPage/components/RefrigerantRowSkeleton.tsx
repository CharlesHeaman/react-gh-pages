import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const RefrigerantRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={185}/></td>
            <td><Skeleton type='label' width={200}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={55}/></td>
            <td><Skeleton type='label' width={315}/></td>
            <td><Skeleton type='label' width={100}/></td>
        </tr>
    )
}

export default RefrigerantRowSkeleton
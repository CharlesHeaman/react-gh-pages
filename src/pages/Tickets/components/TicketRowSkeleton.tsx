import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const TicketRowSkeleton = (props: {
    hideVisitDate?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={300}/></td>
            <td><Skeleton type='label' width={300}/></td>
            <td><Skeleton type='label' width={400}/></td>
            <td><Skeleton type='label' width={60}/></td>
            {!props.hideVisitDate ? <td><Skeleton type='label' width={80}/></td> : null}
            <td><Skeleton type='label' width={120}/></td>
        </tr>
    )
}

export default TicketRowSkeleton
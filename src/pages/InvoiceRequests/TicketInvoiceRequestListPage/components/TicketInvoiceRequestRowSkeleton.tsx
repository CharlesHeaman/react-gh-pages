import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const InvoiceRequestRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={70}/></td>
            <td><Skeleton type='label' width={85}/></td>
            <td><Skeleton type='label' width={70}/></td>
            <td><Skeleton type='label' width={575}/></td>
            <td><Skeleton type='label' width={65}/></td>
            <td><Skeleton type='label' width={120}/></td>
            <td><Skeleton type='label' width={80}/></td>
            <td><Skeleton type='label' width={125}/></td>
        </tr>
    )
}

export default InvoiceRequestRowSkeleton
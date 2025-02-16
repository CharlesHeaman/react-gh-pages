import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const InvoiceTypeRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={220}/></td>
            <td><Skeleton type="label" width={100}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
            <td><Skeleton type="label" width={60}/></td>
        </tr>
    )
}

export default InvoiceTypeRowSkeleton
import Skeleton from "../../../../../components/ui/General/Skeleton/Skeleton"

const ContactRowSkeleton = (props: {
    hideCustomer?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={240}/></td>
            {!props.hideCustomer ? <td><Skeleton type='label' width={400}/></td> : null}
            <td><Skeleton type='label' width={240}/></td>
            <td><Skeleton type='label' width={140}/></td>
            <td><Skeleton type='label' width={140}/></td>
        </tr>
    )
}

export default ContactRowSkeleton
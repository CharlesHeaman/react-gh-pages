import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const QuoteRowSkeleton = (props: {
    hideCustomer?: boolean
    isJobs?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type='label' width={85}/></td>
            {!props.isJobs ?  <>
                <td><Skeleton type='label' width={34}/></td>
                {/* <td><Skeleton type='label' width={125}/></td> */}
                <td><Skeleton type='label' width={75}/></td>
            </> : null}
            {!props.hideCustomer ? 
                <td><Skeleton type='label' width={400}/></td> :
                null
            }
            <td><Skeleton type='label' width={300}/></td>
            <td><Skeleton type='label' width={105}/></td>
            <td><Skeleton type='label' width={100}/></td>
            <td><Skeleton type='label' width={34}/></td>
        </tr>
    )
}

export default QuoteRowSkeleton
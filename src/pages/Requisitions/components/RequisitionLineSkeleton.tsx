import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const RequisitionLineSkeleton = (props: {
    hideType?: boolean
}) => {
    return (
        <tr>
            <td><Skeleton type="label" width={85}/></td>
            {!props.hideType ? <td><Skeleton type="label" width={105}/></td> : null}
            <td><Skeleton type="label" width={150}/></td>
            <td><Skeleton type="label" width={150}/></td>
            <td><Skeleton type="label" width={85}/></td>
            <td><Skeleton type="label" width={100}/></td>
        </tr>
    )
}

export default RequisitionLineSkeleton
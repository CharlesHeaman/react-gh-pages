import Skeleton from "../../components/ui/General/Skeleton/Skeleton"

const RiskAssessmentMethodStatementRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={300}/></td>
            <td><Skeleton type="label" width={75}/></td>
            <td><Skeleton type='label' width={480}/></td>
            <td><Skeleton type="label" width={100}/></td>
        </tr>
    )
}

export default RiskAssessmentMethodStatementRowSkeleton
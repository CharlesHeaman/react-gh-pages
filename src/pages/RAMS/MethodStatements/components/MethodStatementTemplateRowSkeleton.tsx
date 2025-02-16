import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const MethodStatementTemplateRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={345}/></td>
            <td><Skeleton type='label' width={375}/></td>
            <td><Skeleton type='label' width={95}/></td>
        </tr>
    )
}

export default MethodStatementTemplateRowSkeleton
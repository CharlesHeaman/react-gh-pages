import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const DocumentRowSkeleton = (props: {
    hideType?: boolean
}) => {
    return (
        <tr>
            <td style={{ width: '100%' }}><Skeleton type='label' grow/></td>
            {!props.hideType ? <td><Skeleton type='label' width={80}/></td> : null}
            <td><Skeleton type='label' width={80}/></td>
            <td><Skeleton type='label' width={32}/></td>
        </tr>
    )
}

export default DocumentRowSkeleton
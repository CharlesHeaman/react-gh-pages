import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const SupplierManufacturerRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type='label' width={120}/></td>
            <td><Skeleton type='label' width={345}/></td>
            <td><Skeleton type='label' width={65}/></td>
            <td><Skeleton type='label' width={90}/></td>
            <td>
                <div style={{ display: 'flex', gap: 'var(--normal-gap)'}}>
                    <Skeleton type='label' width={35}/>
                    <Skeleton type='label' width={35}/>
                    <Skeleton type='label' width={35}/>
                    <Skeleton type='label' width={35}/>
                </div>
            </td>
            <td><Skeleton type='label' width={110}/></td>
        </tr>
    )
}

export default SupplierManufacturerRowSkeleton
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const DocumentsSkeleton = () => {
    return (
        <table className="loading-table">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {[...Array(20)].map((_, index) =>
                    <tr key={index}>
                        <td><Skeleton type='text' width='300'/></td>
                        <td><Skeleton type='text' width='100'/></td>
                        <td><Skeleton type='label'/></td>
                        <td><Skeleton type='label'/></td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default DocumentsSkeleton
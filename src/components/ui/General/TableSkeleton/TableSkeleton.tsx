import styles from './TableSkeleton.module.css'

function TableSkeleton(props: {
    rowCount: number,
    hideFooter?: boolean
}) {
    return (
        <table className={styles['table-skeleton']}>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {[...Array(props.rowCount)].map((_item, index) => 
                    <tr key={index}>
                        <td></td>
                    </tr>
                )}
            </tbody>
            {!props.hideFooter && <tfoot>
                <tr>
                    <th></th>
                </tr>
            </tfoot>}
        </table>
    )
}

export default TableSkeleton    
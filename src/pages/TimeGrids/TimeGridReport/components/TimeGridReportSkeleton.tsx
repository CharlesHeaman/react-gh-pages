import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import TableSkeleton from "../../../../components/ui/General/TableSkeleton/TableSkeleton"
import ComparisonBoxSkeleton from "../../TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const TimegridReportSkeleton = (props: {
    isAccounts: boolean
}) => {
    return (
        <>
            {[...Array(3)].map((_, index) =>
                <section key={index}>
                    <section>
                        <Skeleton type='title'/>
                        <TableSkeleton rowCount={7}/>
                    </section>
                    <section>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: !props.isAccounts ? '1fr 1fr 1fr 1fr' : '1fr 1fr',
                            gap: 'var(--normal-gap)',
                        }}>
                            <ComparisonBoxSkeleton/>
                            <ComparisonBoxSkeleton/>
                            {!props.isAccounts && <>
                                <ComparisonBoxSkeleton/>
                                <ComparisonBoxSkeleton/>
                            </>}
                        </div>
                    </section>
                </section>
            )}
        </>
    )
}

export default TimegridReportSkeleton
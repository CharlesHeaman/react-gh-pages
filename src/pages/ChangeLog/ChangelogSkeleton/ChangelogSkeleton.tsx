import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"
import styles from "../Change/Change.module.css"

const ChangelogSkeleton = (props: {
    perPage: number
}) => {
    return (
        <>
            {[...Array(props.perPage)].map((_, index) =>
                <div className={styles['change']} key={index}>
                    <h2><Skeleton type='title' width={300}/></h2>
                    <div className={styles['header']}>
                        <Skeleton type='label' width={90}/>
                        <Skeleton type='label' width={34}/>
                        <Skeleton type='label'/>
                    </div>
                    <div className={styles['body']}>
                        <ComparisonBoxSkeleton height={65}/>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChangelogSkeleton
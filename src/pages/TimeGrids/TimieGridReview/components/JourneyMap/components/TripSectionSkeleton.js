import GridItem from "../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import Skeleton from "../../../../../../components/ui/General/Skeleton/Skeleton";
import styles from './TripSection.module.css';

function TripSectionSkeleton() {
    return (
        <div className={`${styles['section']} grey`}>
            <div className={styles['section-header']}>
                <Skeleton type='label' width='120'/>
            </div>
            <div>
                <InfoGrid>
                    {[...Array(2)].map((_, index) =>
                        <GridItem span='3' key={index}>
                            <Skeleton type='small-title' width='80'/>
                            <Skeleton type='text' width='100'/>
                        </GridItem>
                    )}
                </InfoGrid>
            </div>
        </div>
    )
}

export default TripSectionSkeleton
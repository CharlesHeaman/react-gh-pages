import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const ReturnNoteInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type='title' width={150}/>
                <InfoGrid>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title" width={150}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={200}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default ReturnNoteInformationSkeleton
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const DescriptionOfWorksInformationSkeleton = () => {
    return (
        <>
            <section>
                <ComparisonBoxSkeleton height={100}/>
            </section>
            <section>
                <Skeleton type='title' width={100}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
                <ComparisonBoxSkeleton height={200}/>
            </section>
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
                <ComparisonBoxSkeleton height={200}/>
            </section>
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
                <ComparisonBoxSkeleton height={200}/>
            </section>
        </>
    )
}

export default DescriptionOfWorksInformationSkeleton
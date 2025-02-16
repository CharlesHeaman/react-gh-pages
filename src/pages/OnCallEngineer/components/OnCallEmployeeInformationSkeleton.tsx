import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const OnCallEmployeeInformationSkeleton = () => {
    return (
        <section>
            <Skeleton type='title' width={100}/>
            <InfoGrid>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
                <GridItem span={3}>
                    <ComparisonBoxSkeleton/>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default OnCallEmployeeInformationSkeleton
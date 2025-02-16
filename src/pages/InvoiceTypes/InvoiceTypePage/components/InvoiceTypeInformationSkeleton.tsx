import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const CostCentreInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type='title' width={150}/>
                <InfoGrid>
                    <GridItem span={4}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default CostCentreInformationSkeleton
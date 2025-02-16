import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const VehicleInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type='title' width={150}/>
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
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title" width={150}/>
                <InfoGrid>
                    <GridItem span={3}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title" width={150}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title" width={150}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
                <InfoGrid>
                    <GridItem>
                        <Skeleton type="label" height={40} width={150}/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton height={115}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default VehicleInformationSkeleton
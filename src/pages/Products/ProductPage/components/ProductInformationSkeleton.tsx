import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const ProductInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type="title"/>
                <InfoGrid>
                    <GridItem>
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
                    <GridItem span={3}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton height={200}/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
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
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
                <InfoGrid>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
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
                </InfoGrid>
            </section>
        </>
    )
}

export default ProductInformationSkeleton
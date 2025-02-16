import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const CustomerInformationSkeleton = () => {
    return (
        <>
            <section>
                <Skeleton type='title' width={100}/>
                <InfoGrid>
                    <GridItem span={4}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={4}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={4}>
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
                <Skeleton type='title' width={100}/>
                <InfoGrid>
                    <GridItem span={4}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem>
                        <ComparisonBoxSkeleton height={300}/>
                    </GridItem>
                </InfoGrid>
            </section> 
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
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
                <Skeleton type='title' width={100}/>
                <InfoGrid>
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

export default CustomerInformationSkeleton
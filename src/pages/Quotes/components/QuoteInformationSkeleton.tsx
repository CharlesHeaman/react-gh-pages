import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import TableSkeleton from "../../../components/ui/General/TableSkeleton/TableSkeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const QuoteInformationSkeleton = () => {
    return (
        <>
            <section>
                <GridItem>
                    <ComparisonBoxSkeleton height={100}/>
                </GridItem>
            </section>
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
                <InfoGrid>
                    <GridItem>
                        <TableSkeleton rowCount={3}/>
                    </GridItem>
                </InfoGrid>
            </section>      
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
                <InfoGrid>
                    <GridItem>
                        <TableSkeleton rowCount={3}/>
                    </GridItem>
                </InfoGrid>
            </section>      
        </>
    )
}

export default QuoteInformationSkeleton
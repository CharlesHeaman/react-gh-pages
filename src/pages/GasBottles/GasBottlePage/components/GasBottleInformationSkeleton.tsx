import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const GasBottleInformationSkeleton = (props: {
    isConsumable?: boolean,
}) => {
    return (
        <>
            <section>
                <Skeleton type="title"/>
                <InfoGrid columnCount={props.isConsumable ? 4 : 6}>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    <GridItem span={2}>
                        <ComparisonBoxSkeleton/>
                    </GridItem>
                    {!props.isConsumable ? <>
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
                    </> : null}
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
                <ComparisonBoxSkeleton height={115}/>
            </section>
            <hr/>
            <section>
                <Skeleton type="title"/>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={115}/>
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

export default GasBottleInformationSkeleton
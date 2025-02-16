import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "./ComparisonBoxSkeleton/ComparisonBoxSkeleton"

const TimegridInformationSkeleton = () => {
    return (
        <>
            <section>
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
                    </GridItem>
                </InfoGrid>
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
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <Skeleton type='title' width={100}/>
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
                <InfoGrid>
                    <GridItem>
                        <ComparisonBoxSkeleton height={100}/>
                    </GridItem>
                </InfoGrid>
            </section>
        </>
    )
}

export default TimegridInformationSkeleton
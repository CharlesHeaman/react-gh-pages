import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

function EngineerTimeReviewSkeleton() {
    return (
        <>
            <OuterContainer maxWidth='700'>
                <InnerContainer skeleton>
                    <InfoGrid>
                        <GridItem span='2'>
                            <Skeleton type='small-title'/>
                            <Skeleton type='label'/>    
                        </GridItem>
                        <GridItem span='2'>
                            <Skeleton type='small-title'/>
                            <Skeleton type='text' width={100}/>
                        </GridItem>
                    </InfoGrid>
                </InnerContainer>
            </OuterContainer>
            {[...Array(10)].map((summary, index) =>
                <OuterContainer maxWidth='700' key={index}>
                    <InnerContainer skeleton collapsible startCollapsed/>
                </OuterContainer>
            )}
        </>
    )
}

export default EngineerTimeReviewSkeleton
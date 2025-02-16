import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const RiskAssessmentSkeleton = () => {
    return (
        <>
            <InnerContainer skeleton>
                {[...Array(2)].map((_, index) =>
                    <section key={index}>
                        <InfoGrid>
                            <GridItem>
                                <Skeleton type="small-title"/>
                            </GridItem>
                            {[...Array(5)].map((_, index) =>
                                <GridItem key={index}>
                                    <Skeleton type="text"/>
                                </GridItem>
                            )}
                        </InfoGrid>
                    </section>
                )}
            </InnerContainer>
            <section>
                <Skeleton type="title"/>
                <ListWrapper>
                    {[...Array(4)].map((_, index) => 
                        <ListItem key={index}>
                            <Skeleton type={'text'} width={200}/>
                            <Skeleton type={'text'} width={150}/>
                        </ListItem>
                    )}
                </ListWrapper>
            </section>
        </>
    )
}

export default RiskAssessmentSkeleton
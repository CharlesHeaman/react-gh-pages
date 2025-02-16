import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer"
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"
import ComparisonBoxSkeleton from "../../TimeGrids/TimieGridReview/components/ComparisonBoxSkeleton/ComparisonBoxSkeleton"
import PurchaseOrderLineRowSkeleton from "./PurchaseOrderLineRowSkeleton"

const PurchaseOrderInformationSkeleton = () => {
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
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                }}>
                    <div>
                        <section>
                            <InnerContainer>
                                <section>
                                    <Skeleton type='title' width={100}/>
                                    <InfoGrid>
                                        <GridItem span={3}>
                                            <ComparisonBoxSkeleton/>
                                        </GridItem>
                                        <GridItem span={3}>
                                            <ComparisonBoxSkeleton/>
                                        </GridItem>
                                        <GridItem>
                                            <ComparisonBoxSkeleton/>
                                        </GridItem>
                                        <GridItem span={3}>
                                            <ComparisonBoxSkeleton/>
                                        </GridItem>
                                    </InfoGrid>
                                </section>
                            </InnerContainer>
                        </section>
                    </div>
                    <div>
                        <section>
                            <InnerContainer>
                                <section>
                                    <Skeleton type='title' width={100}/>
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
                                        <GridItem>
                                            <ComparisonBoxSkeleton/>
                                        </GridItem>
                                    </InfoGrid>
                                </section>
                            </InnerContainer>
                        </section>
                    </div>
                </div>
            </section>
            <section>
                <InnerContainer>
                    <section>
                        <Skeleton type='title' width={100}/>
                        <InfoGrid>
                            <GridItem>
                                <div className="table-wrapper">
                                    <table>
                                        <tbody>
                                            {[...Array(5)].map((_, index) => 
                                                <PurchaseOrderLineRowSkeleton key={index}/>
                                            )}                    
                                        </tbody>
                                    </table>
                                </div>
                            </GridItem>
                        </InfoGrid>
                    </section>
                </InnerContainer>
            </section>      
        </>
    )
}

export default PurchaseOrderInformationSkeleton
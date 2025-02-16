import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import SideBar from "../../../../components/ui/Containers/SideBar/SideBar"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"
import TableSkeleton from "../../../../components/ui/General/TableSkeleton/TableSkeleton"
import ComparisonBoxSkeleton from "./ComparisonBoxSkeleton/ComparisonBoxSkeleton"

function TimeGridReviewSkeleton() {
    return (
        <div className="page-grid">
            <div className="page-main">
            <section>
                <Skeleton type='title' width={100}/>
                    <InnerContainer 
                        skeleton
                        collapsible 
                        startCollapsed
                    ></InnerContainer>
                    <InnerContainer 
                        skeleton
                        collapsible 
                        startCollapsed
                    ></InnerContainer>
                </section>
                <section>
                    <Skeleton type='title' width={100}/>
                    <TableSkeleton rowCount={2}/>
                </section>
                <section>
                    <Skeleton type='title' width={100}/>
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        gap: 'var(--normal-gap)'
                    }}>
                        <ComparisonBoxSkeleton/>
                        <ComparisonBoxSkeleton/>
                        <ComparisonBoxSkeleton/>
                        <ComparisonBoxSkeleton/>
                    </div>
                </section>
                <div style={{ width: '100%', margin: 'var(--big-gap) 0 var(--big-gap)', borderBottom: '1px solid var(--high-contrast)'}}></div>
                <section>
                    <Skeleton type='title' width={100}/>
                    <InfoGrid>
                        <GridItem>
                            <Skeleton type='text' width={325}/>
                        </GridItem>
                        <GridItem>
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: '1fr 1fr 1fr',
                                gap: 'var(--normal-gap)'
                            }}>
                                <ComparisonBoxSkeleton/>
                                <ComparisonBoxSkeleton/>
                                <ComparisonBoxSkeleton/>
                            </div>                                
                        </GridItem>
                    </InfoGrid>
                </section>

            </div>
            <div className="page-side">
                <SideBarModule skeleton>
                    <Skeleton type='side-bar-button'/>
                    <Skeleton type='side-bar-button'/>
                    <Skeleton type='side-bar-button'/>
                </SideBarModule>
                <SideBarModule skeleton>
                    <Skeleton type='side-bar-button'/>
                    <Skeleton type='side-bar-button'/>
                </SideBarModule>
            </div>
        </div>
    )
}

export default TimeGridReviewSkeleton
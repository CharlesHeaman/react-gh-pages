import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const PersonnelProtectiveEquipmentSkeleton = () => {
    return (
        <section>
            <Skeleton type="title"/>
            <InfoGrid>
                <GridItem>
                    <Skeleton type='small-title'/>
                    <Skeleton type="text"/>
                </GridItem>
                <GridItem>
                    <Skeleton type='small-title'/>
                    <Skeleton type="image" width={150} height={150}/>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PersonnelProtectiveEquipmentSkeleton
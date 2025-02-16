import { useState } from "react"
import SiteSelect from "../../../../../../../../../components/form/SiteSelect/SiteSelect"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { EquipmentCollectionResponse } from "../../../../../../../../../types/equipment.types"
import { SiteResponseData } from "../../../../../../../../../types/sites.types"
import putAPI from "../../../../../../../../../utils/putAPI"

const MoveSiteEquipment = (props: {
    customerID: number,
    site: SiteResponseData,
    equipment: EquipmentCollectionResponse,
    equipmentCount: number,
    show: boolean,
    getEquipment: (siteID: number) => void, 
    hideFunc: () => void
}) => {

    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedSite, setSelectedSite] = useState<SiteResponseData | undefined>(props.site);
    
    const moveEquipment = () => {
        putAPI(`equipment/collection_change_site`, {}, {
            site_id: selectedSite?.id,
            equipment_ids: props.equipment.data.map(equipment => equipment.id)
        }, (response: any) => {
            props.getEquipment(props.site.id);
            props.hideFunc();
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Move Equipment to New Site'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Move Equipment"
                iconFont="local_laundry_service"
                clickFunc={moveEquipment}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a site to move all {props.equipmentCount} equipment to.</p>
                </GridItem>
                <GridItem>
                    <p>All service and planned maintenance history will be retained.</p>
                </GridItem>
                <GridItem title='Site'>
                    <SiteSelect 
                        selectedSite={selectedSite} 
                        setSelectedSite={setSelectedSite} 
                        customerID={props.customerID}
                        hasSubmitted                    
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default MoveSiteEquipment
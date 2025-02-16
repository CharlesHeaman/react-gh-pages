import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import Skeleton from "../../../../../../../components/ui/General/Skeleton/Skeleton";
import { EquipmentResponseData } from "../../../../../../../types/equipment.types";
import { SiteCollectionResponse, SiteResponseData } from "../../../../../../../types/sites.types";
import getAPI from "../../../../../../../utils/getAPI";
import putAPI from "../../../../../../../utils/putAPI";
import SiteSelect from "../../../../../../../components/form/SiteSelect/SiteSelect";

const EquipmentChangeSite = (props: {
    equipmentID: number
    site: SiteResponseData,
    customerID: number,
    setEquipmentData: Dispatch<SetStateAction<EquipmentResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedSite, setSelectedSite] = useState<SiteResponseData | undefined>(props.site);
    
    const updateEquipment = () => {
        putAPI(`equipment/${props.equipmentID}/change_site`, {}, {
            site_id: selectedSite?.id,
        }, (response: any) => {
            const equipmentData: EquipmentResponseData = response.data;
            props.setEquipmentData(equipmentData);
            props.hideFunc();
            setSelectedSite(selectedSite);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Change Equipment Site'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Change Site"
                iconFont="business"
                disabled={selectedSite === undefined}
                clickFunc={updateEquipment}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a site to move this equipment to.</p>
                </GridItem>
                <GridItem>
                    <p>All service and planned maintenance history will be retained.</p>
                </GridItem>
                <GridItem title='Site'>
                    <SiteSelect
                        selectedSite={selectedSite}
                        setSelectedSite={setSelectedSite}
                        hasSubmitted={false}
                        customerID={props.customerID}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </WindowOverlay>
    )
}

export default EquipmentChangeSite
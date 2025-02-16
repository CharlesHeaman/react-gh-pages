import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { Coordinates, CreateSiteAttributes, SiteResponseData } from "../../../../../../types/sites.types";
import putAPI from "../../../../../../utils/putAPI";
import SiteLocationForm from "../../../CreateSite/components/SiteLocationForm";
import isSiteLocationFormValid from "../../../CreateSite/utils/isSiteLocationFormValis";
import updateStateParams from "../../../../../../utils/updateStateParams/updateStateParams";

const UpdateSiteLocation = (props: {
    site: SiteResponseData,
    show: boolean,
    hideFunc: () => void,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
}) => {
    // Map States
    const [map, setMap] = useState<google.maps.Map>();
    const [coordinates, setCoordinates] = useState<Coordinates | undefined>(props.site.data.coordinates ? props.site.data.coordinates : undefined);

    // Form States
    const [siteDetails, setSiteDetails] = useState<CreateSiteAttributes>({
        name: props.site.data.name,
        code: props.site.data.code,
        location: props.site.data.location,
        description: props.site.data.description,
        address: props.site.data.address,
        postcode: props.site.data.postcode,
        telephone: props.site.data.telephone ? props.site.data.telephone : '',
        special_instructions: props.site.data.special_instructions ? props.site.data.special_instructions : '',
        coordinates: {
            lat: props.site.data.coordinates? props.site.data.coordinates.lat : 0,
            lng: props.site.data.coordinates? props.site.data.coordinates.lng : 0
        }
    });    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (map) {
            coordinates && map.panTo(coordinates);
        }
    }, [coordinates]);

    const updateSiteParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSiteDetails)
    }

    const updateCoordinates = (coordinates: Coordinates) => {
        setSiteDetails((prevState: any) => {
            return {
                ...prevState, 
                coordinates: coordinates
            }
        });
    }

    const formComplete = isSiteLocationFormValid(siteDetails);

    const updateSite = () => {
        if (!formComplete) return;
        putAPI(`sites/${props.site.id}/update_location`, {}, {
            address: siteDetails.address,
            postcode: siteDetails.postcode,
            coordinates: siteDetails.coordinates
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
        }, setIsUpdating)
    }

    const hasCoordinates = props.site.data.coordinates !== null;

    return (
        <>
            <WindowOverlay
                title={`${hasCoordinates ? 'Update' : "Set"} Site Location`}
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={800}
                top
                footer={<SubmitButton   
                    text={`${hasCoordinates ? 'Update' : "Set"} Site Location`}
                    clickFunc={updateSite}
                    iconFont="my_location"
                    submitting={isUpdating}
                    submittingText="Updating..."
                />}
            >
                <SiteLocationForm 
                    siteDetails={siteDetails} 
                    updateCoordinates={updateCoordinates} 
                    updateParams={updateSiteParams} 
                    showErrors={true}
                />
            </WindowOverlay>            
        </>
    )
}

export default UpdateSiteLocation
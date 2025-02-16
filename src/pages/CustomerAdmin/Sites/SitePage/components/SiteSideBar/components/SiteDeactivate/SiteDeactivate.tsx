import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../../../../../utils/putAPI";
import { SiteResponseData } from "../../../../../../../../types/sites.types";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const SiteDeactivate = (props: {
    siteID: number,
    reactivate: boolean,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    equipmentIDs: Array<number>,
    ticketCount: number,
    quotesCount: number
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateSite = () => {
        putAPI(`sites/${props.siteID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    const hasOpen = (props.ticketCount + props.quotesCount) > 0;

    return (
        <>
            <DeactivateModule
                resourceName="Site"
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />

            {hasOpen ?
                <WindowOverlay 
                    title={'Deactivate Site'} 
                    maxWidth={300} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                >
                    <p>Deactivate is disabled as the site still has open {props.ticketCount > 0 ? 'tickets' : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? 'quotes' : ''}.</p>
                    <p>Close all {props.ticketCount > 0 ? `${props.ticketCount} open tickets` : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? `${props.quotesCount} open quotes` : ''} to deactivate this site.</p>
                </WindowOverlay>
                :
                <DeactivateOverlay 
                    resourceName="Site"
                    reactivate={props.reactivate} 
                    additionalText={!props.reactivate ? 
                        props.equipmentIDs.length > 0 ? <p>This will also deactivate all {props.equipmentIDs.length} equipment.</p> : undefined
                        : undefined
                    }
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                    isSubmitting={isDeactivating} 
                    submitFunc={deactivateSite}
                />
            }
        </>
    )
}

export default SiteDeactivate
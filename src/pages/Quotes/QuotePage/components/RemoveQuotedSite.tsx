import { useState } from "react";
import DeactivateModule from "../../../../components/ui/DeactivateModule/DeactivateModule";
import DeactivateOverlay from "../../../../components/ui/DeactivateModule/DeactivateOverlay";
import deleteAPI from "../../../../utils/deleteAPI";
import { useSearchParams } from "react-router-dom";

const RemoveQuotedSite = (props: {
    quotedSiteID: number,
    getQuotedSites: () => void,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateQuotedSite = () => {
        deleteAPI(`quoted_sites/${props.quotedSiteID}/delete`, {}, () => {
            removeParam();
            setShowDeactivate(false);
            props.getQuotedSites();
        }, setIsDeactivating);
    }

    const removeParam = () => {
        searchParams.delete('quoted_site_id');
        setSearchParams(searchParams);
    } 

    return (
        <>
            <DeactivateModule
                resourceName='Quoted Site'
                showFunc={() => setShowDeactivate(true)}
                actionName="Remove"
                reactivate={false}
            />

            <DeactivateOverlay 
                resourceName="Quoted Site"
                show={showDeactivate} 
                additionalText="This cannot be undone."
                hideFunc={() => setShowDeactivate(false)} 
                actionName="Remove"
                isSubmitting={isDeactivating} 
                submitFunc={deactivateQuotedSite}/>
        </>

    )
}

export default RemoveQuotedSite
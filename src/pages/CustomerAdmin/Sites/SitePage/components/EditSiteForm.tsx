import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import SubmitButton from "../../../../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../../../../components/ui/Containers/ContainerFooter/ContainerFooter";
import { CreateSiteAttributes, SiteResponseData } from "../../../../../types/sites.types";
import putAPI from "../../../../../utils/putAPI";
import updateStateParams from "../../../../../utils/updateStateParams/updateStateParams";
import SiteDetailsForm from "../../CreateSite/components/SiteDetailsForm";
import isSiteDetailsFormValid from "../../CreateSite/utils/isSiteDetailsFormValid";
import checkUniqueSiteCode from "../../utils/checkUniqueSiteCode";
import { useNavigate } from "react-router-dom";
import { DepartmentResponseData } from "../../../../../types/department.types";

const EditSiteForm = (props: {
    site: SiteResponseData,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    department: DepartmentResponseData,
    disabledEdit: () => void
}) => {  
    const navigate = useNavigate();

    // Form States
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
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
    });
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData | undefined>(props.department)
    const [, setIsCodeLoading] = useState(false);
    const [codeUnique, setCodeUnique] = useState(true);

    const formComplete = isSiteDetailsFormValid(siteDetails, codeUnique, departmentData?.id)

    const updateSiteParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setSiteDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`sites/${props.site.id}/update`, {}, siteDetails, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
            props.disabledEdit();
            navigate(`../${siteData.data.code}`, { replace: true, relative: 'path' })
        }, setIsUpdating)
    }

    return (
        <>
           <SiteDetailsForm 
                siteDetails={siteDetails} 
                updateParams={updateSiteParams} 
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                siteCodeUnique={codeUnique}
                checkUniqueSiteCode={() => checkUniqueSiteCode(siteDetails.code, setCodeUnique, setIsCodeLoading, props.site.id)}
                showErrors
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    iconFont="save"
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditSiteForm
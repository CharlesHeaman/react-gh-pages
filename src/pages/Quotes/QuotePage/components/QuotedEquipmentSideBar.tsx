import { Dispatch, SetStateAction } from "react"
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { SiteResponseData } from "../../../../types/sites.types"
import QuotedEquipmentActions from "./QuotedEquipmentActions"
import QuotedEquipmentMaps from "./QuotedEquipmentMaps"
import QuotedEquipmentQuoteText from "./QuotedEquipmentQuoteText"
import RemoveQuotedEquipment from "./RemoveQuotedEquipment"
import QuoteCosting from "../../components/QuoteSideBar/components/QuoteCosting"
import QuotedEquipmentLabourTravel from "./QuotedEquipmentLabourTravel"
import QuotedEquipmentMaterials from "./QuotedEquipmentMaterials"
import ExportResource from "../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"

const QuotedEquipmentSideBar = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    site: SiteResponseData | undefined,
    isEditLabourMode: boolean,
    setIsEditLabourMode: Dispatch<SetStateAction<boolean>>,
    isEditMaterialsMode: boolean,
    setIsEditMaterialsMode: Dispatch<SetStateAction<boolean>>,
    setDistance: Dispatch<SetStateAction<google.maps.DistanceMatrixResponse | null | undefined>>;
    getQuotedEquipment: () => void,
    isLocked: boolean,
}) => {
    return (
        <>
            {!props.isEditLabourMode && !props.isEditMaterialsMode ? <>
                {!props.isLocked && <>
                    <QuotedEquipmentActions
                        quotedEquipmentID={props.quotedEquipment.id}
                        quotedEquipmentStatus={props.quotedEquipment.data.status}
                        getQuotedEquipment={props.getQuotedEquipment}
                    />
                    <QuotedEquipmentQuoteText
                        quotedEquipment={props.quotedEquipment}
                        getQuotedEquipment={props.getQuotedEquipment}
                    />
                    <QuotedEquipmentMaterials
                        setIsEditMode={props.setIsEditMaterialsMode}
                    />
                    <QuotedEquipmentLabourTravel
                        setIsEditMode={props.setIsEditLabourMode}
                    />
                </>}
                {props.site ? <QuotedEquipmentMaps
                    quotedEquipmentID={props.quotedEquipment.id}
                    site={props.site}
                    setDistance={props.setDistance}
                /> : null}
                {!props.isLocked ? <>
                    <QuoteCosting
                        quotedEquipment={props.quotedEquipment}
                        getQuotedEquipment={props.getQuotedEquipment}
                    /> 
                    <RemoveQuotedEquipment 
                        quotedEquipmentID={props.quotedEquipment.id} 
                        getQuotedEquipment={props.getQuotedEquipment}
                    />
                </> : null}
                <ExportResource
                    resourceData={props.quotedEquipment}
                    resourceName="Quoted Equipment"
                />
            </> 
            :
            // Edit Mode
            <>
                <SideBarModule title='Actions'>
                    <SideBarButton 
                        text='Abandon Edit'
                        color="grey"
                        iconFont='cancel'
                        clickEvent={() => {
                            props.setIsEditLabourMode(false);
                            props.setIsEditMaterialsMode(false);
                        }}
                    />
                </SideBarModule>
                {props.site && props.isEditLabourMode ? <QuotedEquipmentMaps
                    quotedEquipmentID={props.quotedEquipment.id}
                    site={props.site}
                    setDistance={props.setDistance}
                    isEdit
                /> : null}
            </>
            }
        </>
    )
}

export default QuotedEquipmentSideBar
import { useState } from "react"
import { DepartmentResponseData } from "../../../../types/department.types"
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { SiteResponseData } from "../../../../types/sites.types"
import EditSiteQuoteLabourTravel from "./EditSiteQuote"
import QuotedSiteSideBar from "./QuotedSiteSideBar"
import SiteQuoteInformation from "./SiteQuoteInformation"
import filterQuotedSiteMaterials from "../utils/filterQuotedSiteMaterials"
import EditSiteQuoteMaterials from "./EditSiteQuoteMaterials"
import filterQuotedSiteEquipment from "../utils/filterQuotedSiteEquipment"
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials"

const QuotedSiteTab = (props: {
    quotedSite: QuotedSiteResponseData,
    site: SiteResponseData | undefined,
    departmentData: DepartmentResponseData,
    quoteLines: Array<QuoteLineResponseData>,
    getQuotedSites: () => void,
    getQuoteLines: () => void,
    isLocked: boolean,
}) => {
    const [isEditLabourMode, setIsEditLabourMode] = useState(false);
    const [isEditMaterialsMode, setIsEditMaterialsMode] = useState(false);

    const [distance, setDistance] = useState<google.maps.DistanceMatrixResponse | null>();

    const [autoAddedQuoteLines, setAutoAddedQuoteLines] = useState<Array<EditQuoteLineData>>([]);
    console.log(autoAddedQuoteLines);

    const filteredMaterialLines = filterQuotedSiteMaterials(props.quoteLines, props.site ? props.site.id : null);
    const filteredEquipmentLines = filterQuotedSiteEquipment(props.quoteLines, props.site ? props.site.id : null);
    
    return (
        <>
            <div className="page-main">
                {!isEditLabourMode && !isEditMaterialsMode ?                    
                    <SiteQuoteInformation
                        quotedSite={props.quotedSite}
                        site={props.site}
                        materialLines={filteredMaterialLines}
                        equipmentLines={filteredEquipmentLines}
                        departmentData={props.departmentData}
                    />
                    : 
                    !isEditMaterialsMode ?
                        <EditSiteQuoteLabourTravel 
                            quotedSite={props.quotedSite} 
                            getQuotedSites={props.getQuotedSites}
                            getQuoteLines={props.getQuoteLines}     
                            distance={distance} 
                            departmentData={props.departmentData}
                            quoteLines={filteredEquipmentLines}
                            autoAddedQuoteLines={autoAddedQuoteLines}
                            setAutoAddedQuoteLines={setAutoAddedQuoteLines}
                            setIsEditMode={setIsEditLabourMode}                
                        />
                        :
                        <EditSiteQuoteMaterials 
                            quotedSite={props.quotedSite} 
                            quoteLines={filteredMaterialLines}
                            setIsEditMode={setIsEditMaterialsMode}      
                            getQuoteLines={props.getQuoteLines}    
                        />
                }
            </div>
            <div className="page-side">
                <QuotedSiteSideBar 
                    quotedSite={props.quotedSite} 
                    site={props.site} 
                    isEditLabourMode={isEditLabourMode}
                    setIsEditLabourMode={setIsEditLabourMode}
                    isEditMaterialsMode={isEditMaterialsMode}
                    setIsEditMaterialsMode={setIsEditMaterialsMode}
                    getQuotedSites={props.getQuotedSites}
                    setDistance={setDistance}
                    setAutoAddedQuoteLines={setAutoAddedQuoteLines}
                    isLocked={props.isLocked}
                />
            </div>
        </>
    )
}

export default QuotedSiteTab
import { useState } from "react"
import { EquipmentResponseData } from "../../../../types/equipment.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import { SiteResponseData } from "../../../../types/sites.types"
import EditEquipmentQuoteLabourTravel from "./EditEquipmentQuoteLabourTravel"
import EquipmentQuoteInformation from "./EquipmentQuoteInformation"
import QuotedEquipmentSideBar from "./QuotedEquipmentSideBar"
import { DepartmentResponseData } from "../../../../types/department.types"
import EditEquipmentQuoteMaterials from "./EditEquipmentQuoteMaterials"
import filterQuotedEquipmentMaterials from "../utils/filterQuotedEquipmentMaterials"

const QuotedEquipmentTab = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    equipment: EquipmentResponseData | undefined,
    site: SiteResponseData | undefined,
    quoteLines: Array<QuoteLineResponseData>,
    getQuotedEquipment: () => void,
    getQuoteLines: () => void,
    departmentData: DepartmentResponseData,
    isLocked: boolean,
}) => {
    const [isEditLabourMode, setIsEditLabourMode] = useState(false);
    const [isEditMaterialsMode, setIsEditMaterialsMode] = useState(false);

    const [distance, setDistance] = useState<google.maps.DistanceMatrixResponse | null>();

    const filteredMaterialLines = filterQuotedEquipmentMaterials(props.quoteLines, props.equipment ? props.equipment.id : null);

    return (
        <>
            <div className="page-main">
                {!isEditLabourMode && !isEditMaterialsMode ? 
                    <EquipmentQuoteInformation
                        quotedEquipment={props.quotedEquipment}
                        equipment={props.equipment}
                        materialLines={filteredMaterialLines}
                        departmentData={props.departmentData}
                    />
                    : 
                    !isEditMaterialsMode ?
                        <EditEquipmentQuoteLabourTravel 
                            quotedEquipment={props.quotedEquipment} 
                            getQuotedEquipment={props.getQuotedEquipment} 
                            distance={distance} 
                            departmentData={props.departmentData}
                            setIsEditMode={setIsEditLabourMode}                
                        />
                        :
                        <EditEquipmentQuoteMaterials 
                            quotedEquipment={props.quotedEquipment} 
                            quoteLines={filteredMaterialLines}
                            setIsEditMode={setIsEditMaterialsMode}      
                            getQuoteLines={props.getQuoteLines}      
                        />
                }
            </div>
            <div className="page-side">
                <QuotedEquipmentSideBar
                    quotedEquipment={props.quotedEquipment}
                    site={props.site}
                    isEditLabourMode={isEditLabourMode}
                    setIsEditLabourMode={setIsEditLabourMode}
                    isEditMaterialsMode={isEditMaterialsMode}
                    setIsEditMaterialsMode={setIsEditMaterialsMode}
                    getQuotedEquipment={props.getQuotedEquipment}
                    setDistance={setDistance}
                    isLocked={props.isLocked}
                />
            </div>
        </>
    )
}

export default QuotedEquipmentTab
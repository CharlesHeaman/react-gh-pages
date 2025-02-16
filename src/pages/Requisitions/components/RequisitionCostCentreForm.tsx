import { Dispatch, SetStateAction } from "react";
import CostCentreSelect from "../../../components/form/CostCentreSelect/CostCentreSelect";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CostCentreResponseData } from "../../../types/costCentres.types";

const RequisitionCostCentreForm = (props: {
    selectedCostCentre: CostCentreResponseData | undefined,
    setSelectedCostCentre: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    showErrors: boolean,
}) => {
    return (
        <section>
            {/* <h2>Cost Centre</h2> */}
            <InfoGrid>                
                <GridItem title='Cost Centre'>
                    <CostCentreSelect 
                        selectedCostCentre={props.selectedCostCentre} 
                        setSelectedCostCentre={props.setSelectedCostCentre} 
                        hasSubmitted={props.showErrors}        
                        required            
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default RequisitionCostCentreForm
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CreateVehicleAttributes } from "../../../../types/vehicles.types";
import CostCentreSelect from "../../../../components/form/CostCentreSelect/CostCentreSelect";
import { CostCentreResponseData } from "../../../../types/costCentres.types";

const VehicleAccountInformationForm = (props: {
    vehicleDetails: CreateVehicleAttributes,
    selectedCostCentre: CostCentreResponseData | undefined,
    setSelectedCostCentre: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
    isEdit?: boolean
}) => {
    return (
        <section>
            {props.isEdit && <h2>Accounts Information</h2>}
            <InfoGrid>                
                <GridItem title='Cost Centre'>
                    <CostCentreSelect 
                        selectedCostCentre={props.selectedCostCentre} 
                        setSelectedCostCentre={props.setSelectedCostCentre} 
                        associatedResourceType={3}
                        hasSubmitted={props.showErrors}        
                        required            
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default VehicleAccountInformationForm
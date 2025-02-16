import { ChangeEvent, Dispatch, SetStateAction } from "react";
import CostCentreSelect from "../../../../components/form/CostCentreSelect/CostCentreSelect";
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid";
import { CostCentreResponseData } from "../../../../types/costCentres.types";
import { CreatePurchaseOrderAttributes } from "../../../../types/purchaseOrder.types";
import PaymentTypeSelect from "../../components/PaymentTypeSelect";

const PurchaseOrderAccountsInformationForm = (props: {
    purchaseOrderDetails: CreatePurchaseOrderAttributes,
    selectedCostCentre: CostCentreResponseData | undefined,
    setSelectedCostCentre: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    selectedPaymentType: number,
    setSelectedPaymentType: Dispatch<SetStateAction<number>>,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    showErrors: boolean,
}) => {
    return (
        <section>
            {/* <h2>Accounts Information</h2> */}
            <InfoGrid>                
                <GridItem title='Cost Centre'>
                    <CostCentreSelect 
                        selectedCostCentre={props.selectedCostCentre} 
                        setSelectedCostCentre={props.setSelectedCostCentre} 
                        hasSubmitted={props.showErrors}        
                        required            
                    />
                </GridItem>
                <GridItem title='Payment'>
                    <PaymentTypeSelect
                        selectedPaymentType={props.selectedPaymentType}
                        setSelectedPaymentType={props.setSelectedPaymentType}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PurchaseOrderAccountsInformationForm
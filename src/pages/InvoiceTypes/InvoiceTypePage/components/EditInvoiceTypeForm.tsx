import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import ContainerFooter from "../../../../components/ui/Containers/ContainerFooter/ContainerFooter"
import { CreateInvoiceTypeAttributes, InvoiceTypeResponseData } from "../../../../types/invoiceTypes.types"
import putAPI from "../../../../utils/putAPI"
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import InvoiceTypeDetailsForm from "../../InvoiceTypesListPage/components/InvoiceTypeDetailsForm"
import isInvoiceTypeFormValid from "../../InvoiceTypesListPage/utils/isInvoiceTypeFormValid"

const EditInvoiceTypeForm = (props: {
    invoiceType: InvoiceTypeResponseData,
    setInvoiceTypeData: Dispatch<SetStateAction<InvoiceTypeResponseData | undefined>>,
    disabledEdit: () => void
}) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [invoiceTypeDetails, setInvoiceTypeDetails] = useState<CreateInvoiceTypeAttributes>({
        name: props.invoiceType.data.name,
        rate_type: !props.invoiceType.data.is_customer_rate ? 0 : 1,
        charge_labour: props.invoiceType.data.charge_labour,
        charge_expenses: props.invoiceType.data.charge_expenses,
        charge_mileage: props.invoiceType.data.charge_mileage,
        charge_materials: props.invoiceType.data.charge_materials,
        charge_subcontract: props.invoiceType.data.charge_subcontract,
        charge_hire: props.invoiceType.data.charge_hire,
    }); 
    const [rateType, setRateType] = useState<number>(!props.invoiceType.data.is_customer_rate ? 0 : 1);

    const updateInvoiceTypeParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setInvoiceTypeDetails)
    }

    const updateInvoiceTypeCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setInvoiceTypeDetails)
    }

    const updateSite = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        putAPI(`invoice_types/${props.invoiceType.id}/update`, {}, {
            ...invoiceTypeDetails,
            is_customer_rate: rateType === 1
        }, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            props.setInvoiceTypeData(invoiceTypeData);
            props.disabledEdit();
        }, setIsUpdating)
    }

    const formComplete = isInvoiceTypeFormValid(invoiceTypeDetails);

    return (
        <>
            <InvoiceTypeDetailsForm
                invoiceTypeDetails={invoiceTypeDetails}
                rateType={rateType}
                setRateType={setRateType}
                updateParams={updateInvoiceTypeParams}
                updateCheckboxParams={updateInvoiceTypeCheckboxParams}
                showErrors={hasSubmitted}
                isEdit
            />
            <ContainerFooter>
                <SubmitButton 
                    text="Save Changes" 
                    clickFunc={updateSite}                
                    submitting={isUpdating}
                    submittingText="Saving..."
                    iconFont="save"
                    disabled={hasSubmitted && !formComplete}
                />
            </ContainerFooter>
        </>
    )
}

export default EditInvoiceTypeForm
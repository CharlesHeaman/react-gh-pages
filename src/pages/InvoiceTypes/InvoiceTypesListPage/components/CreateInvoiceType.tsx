import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CreateInvoiceTypeAttributes, InvoiceTypeResponseData } from "../../../../types/invoiceTypes.types"
import postAPI from "../../../../utils/postAPI"
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams"
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams"
import isInvoiceTypeFormValid from "../utils/isInvoiceTypeFormValid"
import InvoiceTypeDetailsForm from "./InvoiceTypeDetailsForm"

const CreateInvoiceType = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const navigate = useNavigate();

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [invoiceTypeDetails, setInvoiceTypeDetails] = useState<CreateInvoiceTypeAttributes>({
        name: '',
        rate_type: 0,
        charge_labour: true,
        charge_expenses: true,
        charge_mileage: true,
        charge_materials: true,
        charge_subcontract: true,
        charge_hire: true,
    });
    const [rateType, setRateType] = useState<number>(0);

    const updateInvoiceTypeParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setInvoiceTypeDetails)
    }

    const updateInvoiceTypeCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setInvoiceTypeDetails)
    }

    const createInvoiceType = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('invoice_types/create', {}, {
            ...invoiceTypeDetails,
            is_customer_rate: rateType === 1
        }, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            navigate(invoiceTypeData.id.toString())
        }, setIsCreating)
    }

    const formComplete = isInvoiceTypeFormValid(invoiceTypeDetails);

    return (
        <WindowOverlay 
            title={"Create Invoice Type"} 
            maxWidth={550} 
            show={props.show} 
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Invoice Type"
                iconFont="add"
                color="dark-blue"
                clickFunc={createInvoiceType}
                submitting={isCreating}
                submittingText="Creating..."
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <InvoiceTypeDetailsForm
                invoiceTypeDetails={invoiceTypeDetails}
                rateType={rateType}
                setRateType={setRateType}
                updateParams={updateInvoiceTypeParams}
                updateCheckboxParams={updateInvoiceTypeCheckboxParams}
                showErrors={hasSubmitted}
            />
            {/* <InvoiceTypeDetailsForm
                invoiceTypeDetails={invoiceTypeDetails}
                selectedAssociatedResource={associatedResource}
                setSelectedAssociatedResource={setAssociatedResource}
                selectedDepartment={departmentData}
                setSelectedDepartment={setDepartmentData}
                updateParams={updateInvoiceTypeParams}
                showErrors={hasSubmitted}
            /> */}
        </WindowOverlay>
    )
}

export default CreateInvoiceType
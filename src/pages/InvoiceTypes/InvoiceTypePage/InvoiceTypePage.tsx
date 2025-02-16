import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types";
import getAPI from "../../../utils/getAPI";
import InvoiceTypeInformation from "./components/InvoiceTypeInformation";
import InvoiceTypeSideBar from "./components/InvoiceTypeSideBar/InvoiceTypeSideBar";
import InvoiceTypeInformationSkeleton from "./components/InvoiceTypeInformationSkeleton";
import EditInvoiceTypeForm from "./components/EditInvoiceTypeForm";

const InvoiceTypePage = () => {
    const { invoiceTypeID } = useParams();

    // Data States
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(true);
    const [invoiceTypeData, setInvoiceTypeData] = useState<InvoiceTypeResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getInvoiceTypeData();
    }, [invoiceTypeID])


    const getInvoiceTypeData = () => {
        getAPI(`invoice_types/${invoiceTypeID}`, {}, (response: any) => {
            const invoiceTypeData: InvoiceTypeResponseData = response.data;
            setInvoiceTypeData(invoiceTypeData);
        }, setIsInvoiceTypeLoading);
    }

    const isLoading = (
        isInvoiceTypeLoading 
    )

    return (
        <OuterContainer 
            title='Invoice Type' 
            id={invoiceTypeID as string}
            headerContent={invoiceTypeData && !invoiceTypeData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={900}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && invoiceTypeData ?
                        !isEditMode ?
                            <InvoiceTypeInformation
                                invoiceType={invoiceTypeData}
                            /> : 
                            <EditInvoiceTypeForm
                                invoiceType={invoiceTypeData}
                                setInvoiceTypeData={setInvoiceTypeData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <InvoiceTypeInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <InvoiceTypeSideBar 
                        invoiceType={invoiceTypeData}
                        setInvoiceTypeData={setInvoiceTypeData}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />                    
                </div>
            </div> 
        </OuterContainer> 
    )
}

export default InvoiceTypePage
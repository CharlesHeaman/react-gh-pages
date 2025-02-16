import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { InvoiceTypeCollectionResponse } from "../../../types/invoiceTypes.types";
import getAPI from "../../../utils/getAPI";
import getInvoiceTypesSearchParams from "../utils/getInvoiceTypesSearchParams";
import InvoiceTypeSearchHeader from "./components/InvoiceTypeSearchHeader";
import InvoiceTypesList from "./components/InvoiceTypesList";
import CreateInvoiceType from "./components/CreateInvoiceType";

const InvoiceTypeListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States 
    const [isInvoiceTypesLoading, setIsInvoiceTypesLoading] = useState(true);
    const [invoiceTypeData, setInvoiceTypeData] = useState<InvoiceTypeCollectionResponse>();

    const invoiceTypesSearchParams = getInvoiceTypesSearchParams(searchParams);

    useEffect(() => {
        searchVehicles();
    }, [JSON.stringify(invoiceTypesSearchParams)])

    const searchVehicles = () => {
        getAPI('invoice_types', invoiceTypesSearchParams, (response: any) => {
            const invoiceTypesData: InvoiceTypeCollectionResponse = response.data;
            setInvoiceTypeData(invoiceTypesData);
        }, setIsInvoiceTypesLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Invoice Types'
                description="Create, edit and deactivate invoice types. Manage how invoice charge is calculated for tickets."
                maxWidth={1100}
                noBorder
            >
                <InvoiceTypeSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <InvoiceTypesList
                    isInvoiceTypesLoading={isInvoiceTypesLoading}
                    invoiceTypeData={invoiceTypeData}
                    perPage={invoiceTypesSearchParams.perPage}
                />   
            </OuterContainer>

            <CreateInvoiceType
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default InvoiceTypeListPage
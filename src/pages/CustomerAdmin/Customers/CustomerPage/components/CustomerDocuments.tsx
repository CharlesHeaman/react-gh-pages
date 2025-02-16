import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import getAPI from "../../../../../utils/getAPI";
import getDocumentSearchParams from "../../../../../utils/getDocumentSearchParams";
import DocumentSearchHeader from "../../../../Vehicles/VehiclePage/components/DocumentSearchHeader";
import CustomerDocumentsList from "./CustomerDocumentsList";
import UploadCustomerDocuments from "./CustomerSideBar/CustomerUploads/components/UploadCustomerDocument";
import { CustomerDocumentsCollectionResponse } from "../../../../../types/customerDocuments.types";

const CustomerDocuments = (props: {
    customerID: number,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "customer")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<CustomerDocumentsCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.customerID, JSON.stringify(documentSearchParams)]);
    
    const getDocuments = () => {
        getAPI('customer_documents', {
            ...documentSearchParams,
            customer_id: props.customerID,
        }, (response: any) => {
            const documentData: CustomerDocumentsCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="customer"
                    showUpload={() => setShowUpload(true)}
                />                
                <CustomerDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadCustomerDocuments 
                customerID={props.customerID}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default CustomerDocuments;
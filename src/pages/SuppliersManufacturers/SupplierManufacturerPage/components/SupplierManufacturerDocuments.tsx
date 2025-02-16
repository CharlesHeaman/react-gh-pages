import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SupplierManufacturerDocumentsCollectionResponse } from "../../../../types/supplierManufacturerDocuments.types";
import getAPI from "../../../../utils/getAPI";
import getDocumentSearchParams from "../../../../utils/getDocumentSearchParams";
import DocumentSearchHeader from "../../../Vehicles/VehiclePage/components/DocumentSearchHeader";
import SupplierManufacturerDocumentsList from "./SupplierManufacturerDocumentsList";
import UploadSupplierManufacturerDocuments from "./SupplierManufacturerSideBar/components/SupplierManufacturerDocuments/UploadSupplierManufacturerDocument";
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer";
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText";
import getSupplierPurchaseOrdersBlocked from "../../utils/getSupplierPurchaseOrdersBlocked";

const SupplierManufacturerDocuments = (props: {
    supplierID: number,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "supplier_manufacturer")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<SupplierManufacturerDocumentsCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.supplierID, JSON.stringify(documentSearchParams)]);
    
    const getDocuments = () => {
        getAPI('supplier_manufacturer_documents', {
            ...documentSearchParams,
            supplier_id: props.supplierID,
        }, (response: any) => {
            const documentData: SupplierManufacturerDocumentsCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            {/* {documentsData && getSupplierPurchaseOrdersBlocked(documentsData?.data) ? <section>
                <InnerContainer color="red">
                    <IconTitleText
                        iconFont="block"
                        color="red"
                        title="Purchase Orders Blocked"
                        text='Purchase orders are blocked for this supplier due to an expired document.'
                    />
                </InnerContainer> 
            </section> : null} */}

            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="supplier_manufacturer"
                    showUpload={() => setShowUpload(true)}
                />                
                <SupplierManufacturerDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadSupplierManufacturerDocuments 
                supplierID={props.supplierID}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default SupplierManufacturerDocuments;
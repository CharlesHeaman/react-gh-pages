import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { VehicleDocumentsCollectionResponse } from "../../../../types/vehicleDocuments.types";
import getAPI from "../../../../utils/getAPI";
import getDocumentSearchParams from "../../../../utils/getDocumentSearchParams";
import UploadVehicleDocuments from "./components/VehicleUploads/components/UploadVehicleDocuments";
import VehicleDocumentsList from "./VehicleDocumentsList";
import DocumentSearchHeader from "./DocumentSearchHeader";

const VehicleDocuments = (props: {
    vehicleID: number,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "vehicle")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<VehicleDocumentsCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.vehicleID, JSON.stringify(documentSearchParams)]);
    
    const getDocuments = () => {
        getAPI('vehicle_documents', {
            ...documentSearchParams,
            vehicle_id: props.vehicleID,
        }, (response: any) => {
            const documentData: VehicleDocumentsCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="vehicle"
                    showUpload={() => setShowUpload(true)}
                />                
                <VehicleDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadVehicleDocuments 
                vehicleID={props.vehicleID}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default VehicleDocuments;
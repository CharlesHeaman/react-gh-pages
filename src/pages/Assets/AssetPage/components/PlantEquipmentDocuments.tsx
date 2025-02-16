import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlantEquipmentDocumentsCollectionResponse } from "../../../../types/plantEquipmentDocument.types";
import getAPI from "../../../../utils/getAPI";
import getDocumentSearchParams from "../../../../utils/getDocumentSearchParams";
import DocumentSearchHeader from "../../../Vehicles/VehiclePage/components/DocumentSearchHeader";
import UploadPlantEquipmentDocuments from "./AssetSideBar/components/PlantEquipmentUploads/components/UploadPlantEquipmentDocuments";
import PlantEquipmentDocumentsList from "./PlantEquipmentDocumentsList";

const PlantEquipmentDocuments = (props: {
    plantEquipmentID: number,
}) => {
    const [showUpload, setShowUpload] = useState(false);

    const [searchParams] = useSearchParams();

    const documentSearchParams = getDocumentSearchParams(searchParams, "plant_equipment")

    // Data States
    const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
    const [documentsData, setDocumentsData] = useState<PlantEquipmentDocumentsCollectionResponse>();
    
    useEffect(() => {
        getDocuments();
    }, [props.plantEquipmentID, JSON.stringify(documentSearchParams)]);
    
    const getDocuments = () => {
        getAPI('plant_equipment_documents', {
            ...documentSearchParams,
            plant_equipment_id: props.plantEquipmentID,
        }, (response: any) => {
            const documentData: PlantEquipmentDocumentsCollectionResponse = response.data;
            setDocumentsData(documentData);
        }, setIsDocumentsLoading);
    }
    
    return (
        <>
            <section>
                <h2>Documents</h2>
                <DocumentSearchHeader
                    resourcePrefix="plant_equipment"
                    showUpload={() => setShowUpload(true)}
                />                
                <PlantEquipmentDocumentsList  
                    isLoading={isDocumentsLoading}
                    documents={documentsData}
                    getDocuments={getDocuments}
                />
            </section>
            
            <UploadPlantEquipmentDocuments 
                plantEquipmentID={props.plantEquipmentID}
                show={showUpload} 
                hideFunc={() => setShowUpload(false)}
                getDocuments={getDocuments}
            /> 
        </>
    )
}

export default PlantEquipmentDocuments;
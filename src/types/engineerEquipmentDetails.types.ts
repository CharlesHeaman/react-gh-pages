import { CollectionResponse, ResponseData } from "../../../mitchells-admin-client/src/types/response.types"

export interface EngineerEquipmentDetails {
    is_processed: boolean,
    created_by_id: number, 
    created_at: Date,    
    ticket_id: number,     
    ticket_type: number,   
    manufacturer: string | null,  
    model_number: string | null,  
    serial_number: string | null, 
    location: string | null,      
    description: string | null,   
    fuel_type: string | null,      
    gc_number: string | null,   
    notes: string | null       
}

export interface EngineerEquipmentDetailsResponseData extends ResponseData {
    id: number,
    data: EngineerEquipmentDetails
}

export interface EngineerEquipmentDetailsCollectionResponse extends CollectionResponse {
    data: Array<EngineerEquipmentDetailsResponseData>
}
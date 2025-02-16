import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { PlantEquipmentTypeCollectionResponse } from "../../../types/plantEquipmentTypes.types";
import ProductCategoryRowSkeleton from "../../ProductCategories/components/ProductCategoryRowSkeleton";
import PlantEquipmentTypesRow from "./PlantEquipmentTypeRow";
import PlantEquipmentTypeRowSkeleton from "./PlantEquipmentTypeRowSkeleton";

const PlantEquipmentTypesList = (props: {
    isPlantEquipmentTypesLoading: boolean,
    plantEquipmentTypesData: PlantEquipmentTypeCollectionResponse | undefined,
    perPage: number,
}) => {
    // Resource Constants
    const resourceName = 'plant/tools types';
    const resourceIcon = 'handyman';    

    const isLoading = (
        props.isPlantEquipmentTypesLoading 
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'PA Test', 'Calibration Test', 'Inspection', 'Maintenance']}
                isLoading={!(!isLoading && props.plantEquipmentTypesData)}
                skeletonRow={<PlantEquipmentTypeRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.plantEquipmentTypesData ? props.plantEquipmentTypesData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.plantEquipmentTypesData && props.plantEquipmentTypesData.data.map((plantEquipmentTypes, index) => 
                    <PlantEquipmentTypesRow 
                        plantEquipmentType={plantEquipmentTypes}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.plantEquipmentTypesData) && <PaginationNavigation
                data={props.plantEquipmentTypesData.data}
                totalCount={props.plantEquipmentTypesData.total_count}
                perPage={props.plantEquipmentTypesData.pages.per_page}
                resourceName={resourceName}
                prefix="product_category"
            />}
        </div>
    )
}

export default PlantEquipmentTypesList 
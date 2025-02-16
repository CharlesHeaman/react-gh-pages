import { Dispatch, SetStateAction } from "react"
import PlantEquipmentTypeSelect from "../../../../components/form/PlantEquipmentTypeSelect/PlantEquipmentTypeSelect"
import UserSelect from "../../../../components/form/UserSelect/UserSelect"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { PlantEquipmentTypeResponseData } from "../../../../types/plantEquipmentTypes.types"
import { UserResponseData } from "../../../../types/user.types"

export interface AdvancedPlantEquipmentSearchFormParams {
    plant_equipment_type_id: number,
    assigned_to_user_id: number,
}

const PlantEquipmentAdvancedSearchForm = (props: {
    selectedPlantEquipmentType: PlantEquipmentTypeResponseData | undefined,
    setSelectedPlantEquipmentType: Dispatch<SetStateAction<PlantEquipmentTypeResponseData | undefined>>,
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
}) => {
    return (
        <>
            <section>
               <InfoGrid>
                    <GridItem title='Type'>
                        <PlantEquipmentTypeSelect
                            selectedPlantEquipmentType={props.selectedPlantEquipmentType}
                            setSelectedPlantEquipmentType={props.setSelectedPlantEquipmentType}
                        />
                    </GridItem>
                    <GridItem title='Assigned To'>
                        <UserSelect 
                            selectedUser={props.selectedUser} 
                            setSelectedUser={props.setSelectedUser} 
                        />
                    </GridItem>
               </InfoGrid>
            </section>
        </>
    )
}

export default PlantEquipmentAdvancedSearchForm
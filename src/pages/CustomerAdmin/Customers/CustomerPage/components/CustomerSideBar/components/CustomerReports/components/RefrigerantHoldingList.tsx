import Skeleton from "../../../../../../../../../components/ui/General/Skeleton/Skeleton";
import RefrigerantLink from "../../../../../../../../../components/ui/Links/RefrigerantLink";
import SearchTable from "../../../../../../../../../components/ui/SearchTable/SearchTable";
import { EquipmentCollectionResponse } from "../../../../../../../../../types/equipment.types";
import { RefrigerantCollectionResponse } from "../../../../../../../../../types/refrigerant.types";
import formatWeight from "../../../../../../../../../utils/formatWeight";
import reduceEquipmentRefrigerantWeight from "../utils/reduceEquipmentRefrigerantWeight";
import RefrigerantHoldingRow from "./RefrigerantHoldingRow";
import RefrigerantHoldingRowSkeleton from "./RefrigerantHoldingRowSkeleton";

const RefrigerantHoldingList = (props: {
    isRefrigerantsLoading: boolean,
    refrigerants: RefrigerantCollectionResponse | undefined,
    equipment: EquipmentCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    showAdvancedSearch?: () => void
}) => {
    // Resource Constants
    const resourceName = "refrigerants";
    const resourceIcon = "propane";

    const isLoading = (
        props.isRefrigerantsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Refrigerant', 'Weight']}
                isLoading={!(!isLoading && props.refrigerants && props.equipment)}
                skeletonRow={<RefrigerantHoldingRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.refrigerants ? props.refrigerants.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.refrigerants && props.equipment && props.refrigerants.data.map((refrigerant, index) => 
                    <RefrigerantHoldingRow
                        refrigerant={refrigerant}
                        weight={formatWeight(reduceEquipmentRefrigerantWeight(props.equipment ? props.equipment.data.filter(equipment => equipment.data.refrigerant_id === refrigerant.id) : []))}
                        key={index}
                    />
                )}
                footer={<tr>
                    <td></td>
                    <th className="text-right">{formatWeight(reduceEquipmentRefrigerantWeight(props.equipment ? props.equipment.data : []))}kg</th>
                </tr>}
            />
        </div>
    )
}

export default RefrigerantHoldingList
import Label from "../../../../components/ui/General/Label/Label";
import SiteLink from "../../../../components/ui/Links/SiteLink";
import { CreateEquipmentCollectionAttributes } from "../../../../types/equipment.types";
import { SiteResponseData } from "../../../../types/sites.types";
import EquipmentCollectionEquipmentPreview from "./EquipmentCollectionEquipmentPreview";

const PreviewCreateEquipmentCollection = (props: {
    site: SiteResponseData,
    equipmentTypes: Array<CreateEquipmentCollectionAttributes>,
}) => {
    return (
        <section>
            <h2>Equipment List</h2>
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Site</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.equipmentTypes.map((equipmentType, index) => 
                            <EquipmentCollectionEquipmentPreview
                                site={props.site}
                                equipmentType={equipmentType}
                                key={index}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PreviewCreateEquipmentCollection
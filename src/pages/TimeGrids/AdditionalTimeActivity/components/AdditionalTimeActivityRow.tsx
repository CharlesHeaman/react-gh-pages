import { AdditionalTimeActivityResponseData } from "../../../../types/additionalTimeActivity.types"
import AdditionalTimeActivityLink from "./AdditionalTimeActivityLink"

const AdditionalTimeActivityRow = (props: {
    additionalTimeActivity: AdditionalTimeActivityResponseData,
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <AdditionalTimeActivityLink     
                        additionalTimeActivityID={props.additionalTimeActivity.id}  
                        name={props.additionalTimeActivity.data.name}
                        inactive={!props.additionalTimeActivity.data.is_active}
                    />
                </div>
            </td>
        </tr>
    )
}

export default AdditionalTimeActivityRow
import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";
import { DescriptionOfWorksCollectionResponse } from "../../../types/descriptionOfWorks.types";

const ExpiringDescriptionOfWorksWidget = (props: {
    departmentID: number | null | undefined;
}) => {
    // Data States
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorkData, setDescriptionOfWorkData] = useState<DescriptionOfWorksCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return;
        getExpiredDescriptionOfWorks();
    }, [props.departmentID]);

    const getExpiredDescriptionOfWorks = () => {
        getAPI('description_of_works', {
            is_active: true,
            department_id: props.departmentID,
            next_review_before: getMonthRelativeDate(new Date(), 1),
            perPage: 1,
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorkData(descriptionOfWorksData);
        }, setIsDescriptionOfWorksLoading);
    }


    return (
        <DashboardWidget 
            title="Description of Works"
            count={descriptionOfWorkData?.total_count}
            text="Review required in the next month." 
            iconFont={"description"}
            to="../iso/rams_admin/description_of_works"
        />
    )
}

export default ExpiringDescriptionOfWorksWidget;
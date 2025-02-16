import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { TimegridCollectionResponse } from "../../../types/timegrid.types";
import { UserCollectionResponse } from "../../../types/user.types";
import getAPI from "../../../utils/getAPI";

const UnprocessedTimegridWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [isTimegridsLoading, setIsTimegridsLoading] = useState(false);
    const [timegridData, setTimegridsData] = useState<TimegridCollectionResponse>();
    const [isEngineersLoading, setIsEngineersLoading] = useState(true);
    const [engineerData, setEngineerData] = useState<UserCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return
        getEngineers();
    }, [props.departmentID]);

    const getEngineers = () => {
        getAPI('users', {
            department_ids: props.departmentID ? [props.departmentID] : undefined,
            is_timegrid_engineer: true,
            is_active: true,
        }, (response: any) => {
            const engineerData: UserCollectionResponse = response.data;
            setEngineerData(engineerData);
            if (engineerData.data.length > 0) {
                getTimegrids([...new Set(engineerData.data.map(user => user.id))]);
            }
        }, setIsEngineersLoading);
    }

    const getTimegrids = (userIDs: Array<number>) => {
        getAPI('timegrids', {
            user_ids: userIDs,
            statuses: [0],
            perPage: 1
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            setTimegridsData(timegridData);
        }, setIsTimegridsLoading);
    }

    return (
        <DashboardWidget 
            title="Timegrids"
            count={timegridData?.total_count}
            text="Timegrids that haven't been processed." 
            iconFont={"timer"}
            to="timegrids"
        />
    )
}

export default UnprocessedTimegridWidget;
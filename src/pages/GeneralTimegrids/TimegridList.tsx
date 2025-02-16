import { useState, useEffect } from "react";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../components/ui/SearchTable/SearchTable";
import { TimegridCollectionResponse, TimegridResponseData } from "../../types/timegrid.types";
import { UserCollectionResponse } from "../../types/user.types";
import getAPI from "../../utils/getAPI";
import TimegridRow from "../TimeGrids/TimeGridSummary/components/TimegridList/components/TimegridRow";
import findUserTimegrid from "../../utils/findUserTimegrid";
import TimegridRowSkeleton from "./TimegridRowSkeleton";

const TimegridList = (props: {
    isUserLoading: boolean,
    users: UserCollectionResponse | undefined,
    date: Date,
    departmentName: string,
    perPage: number,
    totalCount?: number,
}) => {
    // Data States
    const [isTimegridsLoading, setIsTimegridsLoading] = useState(false);
    const [timegridData, setTimegridsData] = useState<Array<TimegridResponseData>>([]);
    
    // Resource Constants
    const resourceName = "timegrids";
    const resourceIcon = "timer";

    useEffect(() => {
        setIsTimegridsLoading(true)
    }, [props.isUserLoading])

    useEffect(() => {
        if (props.users && props.users.data.length > 0) {
            getTimegrids([...new Set(props.users.data.map(user => user.id))]);
        } else {
            setIsTimegridsLoading(false)
        }
    }, [props.users])

    const getTimegrids = (userIDs: Array<number>) => {
        getAPI('timegrids', {
            user_ids: userIDs,
            date: props.date
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            setTimegridsData(timegridData.data)
        }, setIsTimegridsLoading)
    }

    const isLoading = (
        props.isUserLoading || 
        isTimegridsLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Timegrid Code', 'User', 'Status'];
        return tableHeader
    }

    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.users)}
                skeletonRow={<TimegridRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.users ? props.users.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.users && props.users.data.map((user, index) => 
                    <TimegridRow
                        user={user}
                        date={props.date}
                        departmentName={props.departmentName}
                        timegrid={findUserTimegrid(timegridData, user.id)}
                        key={index}
                    />  
                )}
            />
            {(!isLoading && props.users) && <PaginationNavigation
                data={props.users.data}
                totalCount={props.users.total_count}
                perPage={props.users.pages.per_page}
                resourceName={resourceName}
                prefix="timegrids"    
            />}
        </div>
    )
}

export default TimegridList
import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../../../../../components/ui/SearchTable/SearchTable";
import { StockMovementsCollectionResponse } from "../../../../../../../../types/stockMovements.types";
import { UserResponseData, UserCollectionResponse } from "../../../../../../../../types/user.types";
import findUser from "../../../../../../../../utils/findUser";
import getAPI from "../../../../../../../../utils/getAPI";
import StockMovementRow from "./StockMovementRow";
import StockMovementRowSkeleton from "./StockMovementRowSkeleton";

const StockMovementsList = (props: {
    isStockMovementsLoading: boolean,
    stockMovements: StockMovementsCollectionResponse | undefined,
    perPage: number,
    totalCount: number
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);

    // Resource Constants
    const resourceName = "stock history";
    const resourceIcon = "history";

    useEffect(() => {
        setIsUsersLoading(true);
    }, [props.isStockMovementsLoading])

    useEffect(() => {
        if (props.stockMovements && props.stockMovements.data.length > 0) {
            getUsers([...new Set(props.stockMovements.data.map(refrigerantMovement => refrigerantMovement.data.created_by_id))]);
        } else {
            setIsUsersLoading(false);
        }
    }, [props.stockMovements])

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    const isLoading = (
        props.isStockMovementsLoading ||
        isUsersLoading
    )

    return (
        <div>
            <SearchTable 
                headers={['Type', 'Performed By', 'Description', 'Date']} 
                skeletonRow={<StockMovementRowSkeleton/>} 
                skeletonCount={Math.min(props.perPage, props.totalCount)} 
                count={props.stockMovements ? props.stockMovements.data.length : 0} 
                resourceName={resourceName} 
                resourceIconFont={resourceIcon}
                isLoading={!(!isLoading && props.stockMovements)}
                body={props.stockMovements && props.stockMovements.data.map((stockMovement, index) => 
                    <StockMovementRow
                        stockMovement={stockMovement}
                        user={findUser(userData, stockMovement.data.created_by_id)}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.stockMovements) && <PaginationNavigation
                data={props.stockMovements.data}
                totalCount={props.stockMovements.total_count}
                perPage={props.stockMovements.pages.per_page}
                resourceName={resourceName}
                prefix="stock_movements"
            />}
        </div>
    )
}

export default StockMovementsList
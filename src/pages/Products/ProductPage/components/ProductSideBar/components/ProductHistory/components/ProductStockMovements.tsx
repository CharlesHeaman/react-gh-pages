import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { StockMovementsCollectionResponse } from "../../../../../../../../types/stockMovements.types"
import getAPI from "../../../../../../../../utils/getAPI"
import getPaginationParams from "../../../../../../../../utils/getPaginationParams"
import StockMovementsList from "./StockMovementsList"

const ProductStockMovements = (props: {
    productID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isMovementsLoading, setIsMovementsLoading] = useState(true);
    const [movementsData, setMovementsData] = useState<StockMovementsCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'stock_movements');

    useEffect(() => {
        getMovements();
    }, [JSON.stringify(paginationParams), props.productID])

    const getMovements = () => {
        getAPI(`stock_movements`, {
            ...paginationParams,
            product_id: props.productID
        }, (response: any) => {
            const productMovementData: StockMovementsCollectionResponse = response.data;
            setMovementsData(productMovementData);
        }, setIsMovementsLoading)    
    } 
    return (
        <WindowOverlay 
            title="Product Stock Movements"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={1200}        
            top
        >
            <StockMovementsList
                isStockMovementsLoading={isMovementsLoading}
                stockMovements={movementsData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default ProductStockMovements
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import InactiveLabel from "../../../components/ui/InactiveLabel/InactiveLabel";
import { ProductResponseData } from "../../../types/products.types";
import { RefrigerantResponseData } from "../../../types/refrigerant.types";
import { RefrigerantActivityCollectionResponse, RefrigerantActivityResponseData } from "../../../types/refrigerantActivity.types";
import getAPI from "../../../utils/getAPI";
import EditRefrigerantForm from "./components/EditRefrigerantForm";
import RefrigerantInformation from "./components/RefrigerantInformation";
import RefrigerantInformationSkeleton from "./components/RefrigerantInformtionSkeleton";
import RefrigerantSideBar from "./components/RefrigerantSideBar/RefrigerantSideBar";

const RefrigerantPage = () => {
    const { refrigerantID } = useParams();

    // Data States
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(true);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantResponseData>();
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [productData, setProductData] = useState<ProductResponseData>();
    const [isInactiveActivityLoading, setIsInactiveActivityLoading] = useState(false);
    const [inactiveActivityData, setInactiveActivityData] = useState<RefrigerantActivityResponseData>();

    // Edit States
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        getRefrigerantData();
    }, [refrigerantID]);

    useEffect(() => {
        if (refrigerantData === undefined) return;
        if (!refrigerantData.data.is_active) getInactiveActivity(refrigerantData.id);
    }, [JSON.stringify(refrigerantData)]);

    useEffect(() => {
        if (!refrigerantData) return;
        if (refrigerantData.data.product_id) {
            getProductData(refrigerantData.data.product_id);
        } else {
            setProductData(undefined);
        }
    }, [refrigerantData?.data.product_id]);

    const getRefrigerantData = () => {
        getAPI(`refrigerants/${refrigerantID}`, {}, (response: any) => {
            const refrigerantData: RefrigerantResponseData = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    const getProductData = (product: number) => {
        getAPI(`products/${product}`, {}, (response: any) => {
            const productData: ProductResponseData = response.data;
            if (productData.id !== null) {
                setProductData(productData);
            }
        }, setIsProductLoading)
    }

    const getInactiveActivity = (refrigerantID: number) => {
        getAPI(`refrigerant_activity`, {
            refrigerant_id: refrigerantID,
            type: 2,
            perPage: 1
        }, (response: any) => {
            const refrigerantActivityData: RefrigerantActivityCollectionResponse = response.data;
            setInactiveActivityData(refrigerantActivityData.data[0]);
        }, setIsInactiveActivityLoading)    
    } 

    const isLoading = (
        isRefrigerantLoading || 
        isProductLoading
    )

    return (
        <OuterContainer 
            title='Refrigerant, Gas/Air' 
            id={refrigerantID as string}
            headerContent={refrigerantData && !refrigerantData.data.is_active ? 
                <InactiveLabel/> : 
                null
            }
            maxWidth={800}
        >
            <div className="page-grid">
                <div className="page-main">
                    {!isLoading && refrigerantData ?
                        !isEditMode ?
                            <RefrigerantInformation
                                refrigerant={refrigerantData}
                                product={productData}
                                lastDeactivate={inactiveActivityData?.data.created_at}
                            /> :
                            <EditRefrigerantForm
                                refrigerant={refrigerantData}
                                setRefrigerantData={setRefrigerantData}
                                productData={productData}
                                disabledEdit={() => setIsEditMode(false)}
                            />
                        :
                        <RefrigerantInformationSkeleton/>
                    }
                </div>
                <div className="page-side">
                    <RefrigerantSideBar
                        refrigerant={refrigerantData}
                        setRefrigerantData={setRefrigerantData}
                        product={productData}
                        isActive={refrigerantData?.data.is_active}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </div>
            </div> 
        </OuterContainer> 

    )
}

export default RefrigerantPage
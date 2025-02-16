import { useNavigate, useSearchParams } from "react-router-dom";
import SideBarButton from "../../components/ui/Buttons/SideBarButton/SideBarButton";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import SideBarModule from "../../components/ui/Containers/SideBarModule/SideBarModule";
import Header from "../../components/ui/Structure/Header/Header";
import { useEffect, useState } from "react";
import getAPI from "../../utils/getAPI";
import { ProductQueryCollectionResponse } from "../../types/productQuery.types";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import PaginationNavigation from "../../components/ui/PaginationNavigation/PaginationNavigation";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import NoneFound from "../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../components/ui/General/Skeleton/Skeleton";
import CreateButton from "../../components/form/CreateButton/CreateButton";
import SearchForm from "../../components/form/SearchForm/SearchForm";
import FilterSelect from "../../components/ui/FilterSelect/FilterSelect";
import HeaderFlex from "../../components/ui/HeaderFlex";

const StockQueries = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const perPage = 20;

    const [isQueriesLoading, setIsQueriesLoading] = useState(true);
    const [productQueriesData, setProductQueriesData] = useState<ProductQueryCollectionResponse>();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAPI('product_queries', {
            perPage: perPage,
            offset: searchParams.get('offset')
        }, (response: any) => {
            const productQueriesData: ProductQueryCollectionResponse = response.data;
            setProductQueriesData(productQueriesData);
        }, setIsQueriesLoading)
    }, [])

    const searchQueries = () => {
        
    }

    const headerText = `All stock queries.`

    const isLoading = (
        isQueriesLoading
    )

    return (
        <>
            <Header
                links={[
                    {
                        to: 'stock',
                        text: 'Stock'
                    },
                    {
                        to: 'queries',
                        text: 'Queries'
                    }
                ]}
            />
            <OuterContainer
                title='Stock Queries'
                headerContent={ <HeaderFlex>
                    <SearchForm
                        searchFunc={searchQueries}
                        value={searchTerm}
                        setter={setSearchTerm}
                        placeHolder="Search all purchase orders..."
                    />
                    <CreateButton 
                        text={"Create Stock Query"} 
                        to={"stock/queries/create"}
                    />
                </HeaderFlex>}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{headerText}</p>}
                noBorder
                maxWidth={600}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        {(!isLoading && productQueriesData) ?
                            <ListWrapper>
                                {productQueriesData.data.length > 0 ?
                                    productQueriesData.data.map((productQuery, index) => 
                                        <ListItem
                                            key={index}
                                            clickFunc={() => navigate(productQuery.id.toString())}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column'}}>
                                                <h3>{productQuery.data.name}</h3>
                                                <h4>{productQuery.data.description}</h4>
                                            </div>
                                        </ListItem>
                                    ) : 
                                    <NoneFound
                                        iconFont='query_stats'
                                        text="No timegrids found."
                                    />
                                }
                            </ListWrapper> : 
                            <ListWrapper>
                                {[...Array(perPage)].map((_, index) => 
                                    <ListItem key={index}>
                                        <Skeleton type="small-title" width={150}/>
                                        <Skeleton type="small-title" width={300}/>
                                    </ListItem>
                                )}
                            </ListWrapper>
                        }
                        {(!isLoading && productQueriesData) && <PaginationNavigation
                            data={productQueriesData.data}
                            totalCount={productQueriesData.total_count}
                            perPage={productQueriesData.pages.per_page}
                        />}
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default StockQueries
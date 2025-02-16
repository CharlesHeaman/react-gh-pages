import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import ListItem from "../../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import DisabledLabel from "../../../components/ui/DisabledLabel/DisabledLabel";
import FilterSelect, { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import Skeleton from "../../../components/ui/General/Skeleton/Skeleton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import Header from "../../../components/ui/Structure/Header/Header";
import { HazardousSubstanceCollectionResponse } from "../../../types/hazardousSubstance.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";

const HazardousSubstancesListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const perPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [isHazardousSubstancesLoading, setIsHazardousSubstancesLoading] = useState(true);
    const [hazardousSubstanceData, setHazardousSubstanceData] = useState<HazardousSubstanceCollectionResponse>();
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Active',
            value: false,
            iconFont: 'check_circle',
            selected: true
        },
        {
            text: 'All',
            value: true,
            iconFont: 'public',
        }
    ])

    useEffect(() => {
        getHazardousSubstance();
    }, [searchParams, selectOptions])

    const getHazardousSubstance = () => {
        getAPI('hazardous_substances', {
            name_like: searchTerm,
            offset: searchParams.get('offset'),
            perPage: perPage,
            include_inactive: selectOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const hazardousSubstanceData: HazardousSubstanceCollectionResponse = response.data;
            setHazardousSubstanceData(hazardousSubstanceData);
        }, setIsHazardousSubstancesLoading)
    }

    const isLoading = () => {
        return (
            isHazardousSubstancesLoading
        )
    }
    
    return (
        <>
            <Header
                links={[
                    {
                        to: 'rams',
                        text: 'RAMS'
                    },
                    {
                        to: 'hazardous_substances',
                        text: 'Hazardous Substances'
                    }
                ]}
            />
            <OuterContainer
                title='Hazardous Substances'
                headerContent={
                    <HeaderFlex>
                        <SearchForm
                            searchFunc={getHazardousSubstance}
                            value={searchTerm}
                            setter={setSearchTerm}
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}
                            placeHolder="Search all substances..."
                        />
                        <FilterSelect
                            selections={selectOptions}
                            selectionSetter={setSelectOptions}
                        />
                        <CreateButton
                            text="Create Hazardous Substance"
                            to="rams/hazardous_substances/create"
                        />
                    </HeaderFlex>
                }
                maxWidth={700}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                            {(!isLoading() && hazardousSubstanceData) ? 
                                hazardousSubstanceData.total_count > 0 ?
                                    hazardousSubstanceData.data.map((hazardousSubstanceData, index) => 
                                        <ListItem
                                            clickFunc={() => navigate(`${hazardousSubstanceData.id}`) }
                                            key={index}
                                        >
                                            {!hazardousSubstanceData.data.is_active ? <DisabledLabel hideText/> : ''}
                                            <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${hazardousSubstanceData.data.image_url}`} alt=''/>
                                            <h3 style={{ marginRight: 'auto'}}>{hazardousSubstanceData.data.name}</h3>
                                            <h4>{formatDate(hazardousSubstanceData.data_updated_at)}</h4>
                                        </ListItem>
                                    ) :
                                    <NoneFound
                                        iconFont="report_problem"
                                        text='No hazardous substances found.'
                                    />
                                :
                                [...Array(perPage)].map((_, index) => 
                                    <ListItem key={index}>
                                        <Skeleton type={'image'} height={75} width={75}/>
                                        <Skeleton type={'text'} width={200}/>
                                        <Skeleton type={'text'} width={150}/>
                                    </ListItem>
                                )
                            }
                        </ListWrapper>
                    </div>
                </div>
                {(!isLoading() && hazardousSubstanceData) && <PaginationNavigation
                    data={hazardousSubstanceData.data}
                    totalCount={hazardousSubstanceData.total_count}
                    perPage={hazardousSubstanceData.pages.per_page}
                />}
            </OuterContainer>
        </>
    )
}

export default HazardousSubstancesListPage
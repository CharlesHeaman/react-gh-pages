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
import { PersonnelProtectiveEquipmentCollectionResponse } from "../../../types/personnelProtectiveEquipment.types";
import formatDate from "../../../utils/formatDate";
import getAPI from "../../../utils/getAPI";

const PersonnelProtectiveEquipmentListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const perPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [isPersonnelProtectiveEquipmentLoading, setIsPersonnelProtectiveEquipmentLoading] = useState(true);
    const [personnelProtectiveEquipmentData, setPersonnelProtectiveEquipmentData] = useState<PersonnelProtectiveEquipmentCollectionResponse>();
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
        getPersonnelProtectiveEquipment();
    }, [searchParams, selectOptions])

    const getPersonnelProtectiveEquipment = () => {
        getAPI('personnel_protective_equipment', {
            name_like: searchTerm,
            offset: searchParams.get('offset'),
            perPage: perPage,
            include_inactive: selectOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const personnelProtectiveEquipmentData: PersonnelProtectiveEquipmentCollectionResponse = response.data;
            setPersonnelProtectiveEquipmentData(personnelProtectiveEquipmentData);
        }, setIsPersonnelProtectiveEquipmentLoading)
    }

    const isLoading = () => {
        return (
            isPersonnelProtectiveEquipmentLoading
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
                        to: 'personnel_protective_equipment',
                        text: 'Personnel Protective Equipment'
                    }
                ]}
            />
            <OuterContainer
                title='Personnel Protective Equipment'
                headerContent={
                    <HeaderFlex>
                        <SearchForm
                            searchFunc={getPersonnelProtectiveEquipment}
                            value={searchTerm}
                            setter={setSearchTerm}
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}
                            placeHolder="Search all ppe..."
                        />
                        <FilterSelect
                            selections={selectOptions}
                            selectionSetter={setSelectOptions}
                        />
                        <CreateButton
                            text="Create Personnel Protective Equipment"
                            to="rams/personnel_protective_equipment/create"
                        />
                    </HeaderFlex>
                }
                maxWidth={700}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                            {(!isLoading() && personnelProtectiveEquipmentData) ? 
                                personnelProtectiveEquipmentData.total_count > 0 ?
                                    personnelProtectiveEquipmentData.data.map((personnelProtectiveEquipment, index) => 
                                        <ListItem
                                            clickFunc={() => navigate(`${personnelProtectiveEquipment.id}`) }
                                            key={index}
                                        >
                                            {!personnelProtectiveEquipment.data.is_active ? <DisabledLabel hideText/> : ''}
                                            <img style={{ maxHeight: '75px', marginRight: 'var(--small-gap)'}} src={`${process.env.REACT_APP_API_URL}/${personnelProtectiveEquipment.data.image_url}`} alt=''/>
                                            <h3 style={{ marginRight: 'auto'}}>{personnelProtectiveEquipment.data.name}</h3>
                                            <h4>{formatDate(personnelProtectiveEquipment.data_updated_at)}</h4>
                                        </ListItem>
                                    ) :
                                    <NoneFound
                                        iconFont="masks"
                                        text='No personnel protective equipment found.'
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
                {(!isLoading() && personnelProtectiveEquipmentData) && <PaginationNavigation
                    data={personnelProtectiveEquipmentData.data}
                    totalCount={personnelProtectiveEquipmentData.total_count}
                    perPage={personnelProtectiveEquipmentData.pages.per_page}
                />}
            </OuterContainer>
        </>
    )
}

export default PersonnelProtectiveEquipmentListPage
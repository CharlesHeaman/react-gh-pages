import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "../../../components/form/ActionButton/ActionButton";
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import SideBarButton from "../../../components/ui/Buttons/SideBarButton/SideBarButton";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import ListItem from "../../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import SideBarModule from "../../../components/ui/Containers/SideBarModule/SideBarModule";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import FilterSelect, { FilterSelection } from "../../../components/ui/FilterSelect/FilterSelect";
import NoneFound from "../../../components/ui/General/NoneFound/NoneFound";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import { SelectItem } from "../../../components/ui/SelectMenu/SelectMenu";
import Header from "../../../components/ui/Structure/Header/Header";
import { RiskAssessmentCollectionResponse } from "../../../types/riskAssessment.types";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import RiskAssessmentList from "./components/RiskAssessmentList";
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";

const RiskAssessmentListPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const perPage = 25;

    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRecordReview, setShowRecordReview] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [lastReview, setLastReview] = useState<Date>();
    const [nextReview, setNextReview] = useState<Date>();
    const [isRiskAssessmentsLoading, setIsRiskAssessmentsLoading] = useState(true);
    const [riskAssessmentData, setRiskAssessmentData] = useState<RiskAssessmentCollectionResponse>();
    const [selectedRiskAssessments, setSelectedRiskAssessments] = useState<Array<SelectItem>>([]);
    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>([
        {
            text: 'Active',
            value: true,
            iconFont: 'check_circle',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ])

    useEffect(() => {
        searchRiskAssessments();
    }, [searchParams, selectOptions])

    const searchRiskAssessments = () => {
        getAPI('risk_assessments', {
            name_like: searchTerm,
            offset: searchParams.get('offset'),
            perPage: perPage,
            is_active: selectOptions.find(selection => selection.selected)?.value
        }, (response: any) => {
            const riskAssessmentsData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentSelection(riskAssessmentsData);
            setRiskAssessmentData(riskAssessmentsData);
        }, setIsRiskAssessmentsLoading)
    }


    const setRiskAssessmentSelection = (riskAssessmentsData: RiskAssessmentCollectionResponse) => {
        setSelectedRiskAssessments(riskAssessmentsData.data.map(riskAssessment => {
            return {
                id: riskAssessment.id,
                selected: false,
                display: <h3 style={{ margin: 0 }}>{riskAssessment.data.name}</h3>
            }
        }))
    }

    const updateReviewDates = () => {
        const selectedItems = selectedRiskAssessments.filter(selectItem => selectItem.selected);
        putAPI(`risk_assessments/update_collection`, {}, {
            risk_assessments: selectedItems.map(riskAssessment => {
                return {
                    risk_assessment_id: riskAssessment.id,
                    last_review_at: lastReview,
                    next_review_at: nextReview
                }
            })
        }, () => {
            searchRiskAssessments();
            setShowRecordReview(false);
        }, setIsUpdating)
    }

    const updateSelection = (id: number) => {
        setSelectedRiskAssessments(prevState => 
            prevState.map(selectItem => {
                if (id === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const selectAll = () => {
        setSelectedRiskAssessments(prevState => 
            prevState.map(selectItem => {
                return {
                    ...selectItem,
                    selected: true
                }
            })
        )
    }

    const deselectAll = () => {
        setSelectedRiskAssessments(prevState => 
            prevState.map(selectItem => {
                return {
                    ...selectItem,
                    selected: false
                }
            })
        )
    }

    return (
        <>
            <OuterContainer
                title='Risk Assessments'
                maxWidth={1000}
                headerContent={
                    <HeaderFlex>
                        <SearchForm
                            searchFunc={searchRiskAssessments}
                            value={searchTerm}
                            setter={setSearchTerm}
                            showAdvancedSearch={() => setShowAdvancedSearch(true)}
                            placeHolder="Search all risk assessments..."
                        />
                        <FilterSelect
                            selections={selectOptions}
                            selectionSetter={setSelectOptions}
                        />
                        <PermsProtectedComponent requiredPerms={{ iso: 2 }}>
                            <ShowCreateButton
                                text="Record Review"
                                clickFunc={() => setShowRecordReview(true)}
                                iconFont="assignment_turned_in"
                            />
                            <CreateButton 
                                text={"Create Risk Assessment"} 
                                to={"risk_assessments/create"}
                            />
                        </PermsProtectedComponent>
                    </HeaderFlex>
                }
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <RiskAssessmentList 
                            isRiskAssessmentsLoading={isRiskAssessmentsLoading} 
                            riskAssessments={riskAssessmentData} 
                            perPage={perPage}                
                        />
                    </div>
                    {/* <div className="page-side"> */}
                        {/* <SideBarModule title="Administration">
                            <SideBarButton 
                                text="Personnel Protective Equipment" 
                                iconFont="masks" 
                                clickEvent={() => navigate('../personnel_protective_equipment')}
                            />
                            <SideBarButton 
                                text="Hazardous Substances" 
                                iconFont="report_problem" 
                                clickEvent={() => navigate('../hazardous_substances')}
                            />
                        </SideBarModule>
                        <SideBarModule title="Actions">
                            <SideBarButton 
                                text='Record Review'
                                iconFont="assignment_turned_in"
                                clickEvent={() => setShowRecordReview(true)}
                            />
                        </SideBarModule> */}
                    {/* </div> */}
                </div>
            </OuterContainer>

            <WindowOverlay
                title="Record Review"
                show={showRecordReview}
                hideFunc={() => setShowRecordReview(false)}
                maxWidth={600}
                footer={<SubmitButton
                    text="Record Review"
                    submitting={isUpdating}
                    submittingText='Recording...'
                    iconFont="assignment_turned_in"
                    clickFunc={updateReviewDates}
                    disabled={lastReview === undefined || nextReview === undefined}
                    color='light-green'
                />}
            >
                <p>Record a review for this risk assessment.</p>
                <InfoGrid>
                    <GridItem title='Last Review' span={3}>
                        <input 
                            type='date' 
                            onChange={(e) => setLastReview(new Date(e.target.value))}
                        />
                    </GridItem>
                    <GridItem title='Next Review' span={3}>
                        <input 
                            type='date' 
                            onChange={(e) => setNextReview(new Date(e.target.value))}
                        />
                    </GridItem>
                    <GridItem title='Reviewed Risk Assessments'>
                        <div style={{ 
                            display: 'flex',
                            gap: 'var(--normal-gap)',
                            marginBottom: 'var(--normal-gap)',
                            justifyContent: 'flex-end'
                        }}>
                            <ActionButton
                                iconFont="check_box"
                                text="Select All"
                                color="no-color"
                                clickFunc={selectAll}
                            />
                            <ActionButton
                                iconFont="check_box_outline_blank"
                                text="Deselect All"
                                color="no-color"
                                clickFunc={deselectAll}
                            />
                        </div>
                        <ListWrapper>
                            {selectedRiskAssessments.length > 0 ? 
                                selectedRiskAssessments.map((selectItem, index) => 
                                    <ListItem 
                                        clickFunc={() => updateSelection(selectItem.id)}
                                        key={index}
                                    >
                                        <input type='checkbox' checked={selectItem.selected}/>
                                        {selectItem.display}
                                    </ListItem>
                                ) : 
                                <NoneFound 
                                    iconFont={"assignment_late"} 
                                    text={`No risk assessments found.`}   
                                />
                            }
                        </ListWrapper>
                    </GridItem>
                </InfoGrid>
            </WindowOverlay>
        </>
    )
}

export default RiskAssessmentListPage
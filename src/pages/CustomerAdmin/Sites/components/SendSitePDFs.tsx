import { useEffect, useState } from "react"
import ActionButton from "../../../../components/form/ActionButton/ActionButton"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { SelectItem } from "../../../../components/ui/SelectMenu/SelectMenu"
import { SiteResponseData } from "../../../../types/sites.types"

const SendSitePDFs = (props: {
    customerID: number,
    sites: Array<SiteResponseData>,
    hideFunc: () => void
}) => {

    useEffect(() => {
        setSiteSelection();
    }, [props.sites])

    const [mergePDFs, setMergePDFs] = useState(false);
    const [newPage, setNewPage] = useState(false);
    const [selectedSites, setSelectedSites] = useState<Array<SelectItem>>([]);

    const setSiteSelection = () => {
        setSelectedSites(props.sites.map(site => {
            return {
                id: site.id,
                selected: false,
                display: <h3 style={{ margin: 0 }}>{`${site.data.name} (${site.data.code})`}</h3>
            }
        }))
    }

    const updateSelection = (id: number) => {
        setSelectedSites(prevState => 
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
        setSelectedSites(prevState => 
            prevState.map(selectItem => {
                return {
                    ...selectItem,
                    selected: true
                }
            })
        )
    }

    const deselectAll = () => {
        setSelectedSites(prevState => 
            prevState.map(selectItem => {
                return {
                    ...selectItem,
                    selected: false
                }
            })
        )
    }

    const sendPDFs = () => {
        const selectedItems = selectedSites.filter(selectItem => selectItem.selected);
        if (mergePDFs) {
            window.open(`${process.env.REACT_APP_OLD_SITE_URL}/scutils.asp?a=sendpdf&type=site&cid=${props.customerID}&multirid=${selectedItems.map(site => site.id).join(',')}"`)
        } else {
            for (let siteIndex = 0; siteIndex < selectedItems.length; siteIndex ++) {
                window.open(`${process.env.REACT_APP_OLD_SITE_URL}/scutils.asp?a=sendpdf&type=site&cid=${props.customerID}&rid=${selectedItems[siteIndex].id}&newpage=${newPage ? '1' : ''}&anticache=${Date.now()}`)
            }
        }
        props.hideFunc();
    }

    return (
        <>
            <InfoGrid>
                <GridItem title='Merge PDFs' span={3}>
                    <input 
                        type='checkbox' 
                        checked={mergePDFs}
                        onChange={(e) => e.target.checked ? setMergePDFs(true) : setMergePDFs(false)}
                    />
                </GridItem>
                <GridItem title='New Page for Each Site' span={3}>
                    <input 
                        type='checkbox' 
                        checked={newPage}
                        onChange={(e) => e.target.checked ? setNewPage(true) : setNewPage(false)}
                    />
                </GridItem>
                <GridItem title='Select Sites to PDF'>
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
                        <></>
                        {selectedSites.length > 0 ? 
                            selectedSites.map((selectItem, index) => 
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

            <SubmitButton
                text="Send PDFs"
                color="light-green"
                clickFunc={sendPDFs}
            />
        </>
    )
}

export default SendSitePDFs
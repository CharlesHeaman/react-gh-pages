import NewSelectMenu, { NewSelectItem } from "../../form/NewSelectMenu/NewSelectMenu";

const PerPageSelect = (props: {
    selectedPerPage: number,
    setSelectedPerPage: (perPage: number) => void,
}) => {
    const allCount = 100000;

    const selectItems: Array<NewSelectItem> = [
        {
            icon: <span className="material-icons">auto_stories</span>,
            text: '25',
            clickFunc: () => props.setSelectedPerPage(25),
            selected: props.selectedPerPage === 25
        },
        {
            icon: <span className="material-icons">auto_stories</span>,
            text: '50',
            clickFunc: () => props.setSelectedPerPage(50),
            selected: props.selectedPerPage === 50
        },
        {
            icon: <span className="material-icons">auto_stories</span>,
            text: '100',
            clickFunc: () => props.setSelectedPerPage(100),
            selected: props.selectedPerPage === 100
        },
        {
            icon: <span className="material-icons">public</span>,
            text: 'All',
            clickFunc: () => props.setSelectedPerPage(allCount),
            selected: props.selectedPerPage === allCount
        },
    ];

    return (
        <NewSelectMenu
            iconFont={props.selectedPerPage === allCount ? 'public' : 'auto_stories'}
            selectedText={props.selectedPerPage === allCount ? 'All' : props.selectedPerPage.toString()}
            selectItems={selectItems}
            
        />
    )
}

export default PerPageSelect
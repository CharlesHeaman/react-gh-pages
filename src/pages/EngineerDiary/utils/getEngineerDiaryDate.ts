const getEngineerDiaryDate = (searchDate: string | null) => {
    return searchDate ? 
        new Date(searchDate) : 
        new Date(new Date().setUTCHours(0,0,0,0));
}

export default getEngineerDiaryDate
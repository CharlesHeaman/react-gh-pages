const getOnCallEngineerLink = (departmentName: string | undefined, onCallEngineerID: number) => {
    return `/${departmentName ? `${departmentName.toLocaleLowerCase()}/` : ''}on_call_calendar/${onCallEngineerID}`
}

export default getOnCallEngineerLink
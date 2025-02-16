const getJobURL = (departmentName: string, jobNumber: string) => {
    return `/#/${departmentName}/jobs/${jobNumber}`
}

export default getJobURL
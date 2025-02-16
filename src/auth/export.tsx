import { createContext, MutableRefObject, ReactNode, useContext, useMemo } from "react";
import { usePDF } from "react-to-pdf";
import XLSX, { WorkSheet } from 'sheetjs-style';
import { ResponseData } from "../types/response.types";
var FileSaver = require('file-saver');

const ExportContext = createContext<{
    exportTableToExcel: (dataArray: Array<any>, resourceName: string) => void,
    exportTableToJSON: (dataArray: Array<any>, resourceName: string) => void,
    exportPageToExcel: (data: any, resourceName: string) => void,
    exportPageToJSON: (data: any, resourceName: string) => void,
    exportToPDF: (resourceName: string) => void,
    targetRef: MutableRefObject<any>
} | null>(null);

export const ExportProvider = (props: { children: ReactNode }) => {
    const { toPDF, targetRef } = usePDF({ page: { orientation: 'landscape' } });

    const exportTableToExcel = async (dataArray: Array<ResponseData>, resourceName: string) => {
        const workSheet = XLSX.utils.json_to_sheet(dataArray.map(data => {
            return {
                id: data.id,
                ...data.data,
                data_updated_at: data.data_updated_at,
                url: data.url
            }
        }));
        exportToExcel(workSheet, resourceName);
    }

    const exportPageToExcel = async (resourceData: ResponseData, resourceName: string) => {
        const workSheet = XLSX.utils.json_to_sheet([{
            id: resourceData.id,
            ...resourceData.data,
            data_updated_at: resourceData.data_updated_at,
            url: resourceData.url
        }]);
        exportToExcel(workSheet, resourceName);
    }

    const exportToExcel = (workSheet: WorkSheet, resourceName: string) => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        const wb = { Sheets: { 'data': workSheet }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(blob, `${resourceName}.xlsx`);
    }

    const exportTableToJSON = async (dataArray: Array<ResponseData>, resourceName: string) => {
        var blob = new Blob([JSON.stringify(dataArray)], {type: "text/plain;charset=utf-8"});
        exportToJSON(blob, resourceName);
    }

    const exportPageToJSON = async (resourceData: ResponseData, resourceName: string) => {
        var blob = new Blob([JSON.stringify(resourceData)], {type: "text/plain;charset=utf-8"});
        exportToJSON(blob, resourceName);
    }

    const exportToJSON = (blob: Blob, resourceName: string) => {
        FileSaver.saveAs(blob, `${resourceName}.json`);
    }
    
    const exportToPDF = (resourceName: string) => {
        toPDF({ filename: `${resourceName}.pdf` });
    }

    const value = useMemo(
        () => ({
            exportTableToExcel: exportTableToExcel,
            exportTableToJSON: exportTableToJSON,
            exportPageToExcel: exportPageToExcel,
            exportPageToJSON: exportPageToJSON,
            exportToPDF: exportToPDF,
            targetRef: targetRef
        }),
        []
    );

    return (
        <ExportContext.Provider value={value}>
            {props.children}
        </ExportContext.Provider>
    )
};

export const useExport = () => {
    return useContext(ExportContext)
};

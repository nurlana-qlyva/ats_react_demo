import { useRef, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { IBakim } from '../../../../../../../types'
import AddModal from './components/AddModal'

interface ColumnMeta {
    field: string;
    header: string;
}
const columns: ColumnMeta[] = [
    { field: 'tarih', header: 'TARİH' },
    { field: 'saat', header: 'SAAT' },
    { field: 'servisTanimi', header: 'SERVİS TANIMI' },
    { field: 'servisNedeni', header: 'SERVİS NEDENİ' },
    { field: 'firma', header: 'FİRMA' },
    { field: 'surucu', header: 'SÜRÜCÜ' },
    { field: 'baslamaTarihi', header: 'BAŞLAMA TARİHİ' },
    { field: 'bitisTarihi', header: 'BİTİŞ TARİHİ' },
    { field: 'servisKm', header: 'SERVİS KM.' },
];

const BakimModal = ({ visible, setVisible }) => {
    const [bakim, setBakim] = useState<IBakim[]>([]);
    const [selectedData, setSelectedData] = useState<IBakim[] | null>(null);
    const [visibleColumns, setVisibleColumns] = useState(columns);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default();

                doc.autoTable(exportColumns, araclar);
                doc.save('araclar.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(araclar);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'araclar');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file-excel" severity="success" onClick={exportExcel} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" onClick={exportPdf} data-pr-tooltip="PDF" />
        </div>
    );

    const onHide = () => {
        setVisible(false); 
    };

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-times" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <Dialog header="Servis Bilgileri Plaka: [16 EG 1231 [BMW - X6]]" style={{ width: '70vw' }} visible={visible} onHide={onHide} footer={footerContent}>
            <AddModal />
            <div className='card card-shadow mt-5'>
                <div className="table mt-2">
                    <DataTable value={bakim} header={header} scrollable columnResizeMode="expand" resizableColumns size='small' stripedRows paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                        selectionMode='multiple' selection={selectedData} onSelectionChange={(e) => setSelectedData(e.value)}
                        reorderableColumns reorderableRows onRowReorder={(e) => setBakim(e.value)}
                    >
                        <Column rowReorder style={{ width: '3rem' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        {columns.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} sortable />
                        ))}
                    </DataTable>
                </div>
            </div>
        </Dialog>
    )
}

export default BakimModal

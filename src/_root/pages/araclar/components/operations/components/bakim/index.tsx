import React, { useRef, useState } from 'react'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { IBakim } from '../../../../../../../types'
import AddModal from './components/AddModal'
import {
    Paginator, PaginatorPageChangeEvent, PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions
} from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';


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
    // pagination
    const [first, setFirst] = useState<number[]>([0, 0, 0]);
    const [rows, setRows] = useState([10, 10, 10]);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const onHide = () => {
        setVisible(false);
    };

    const onPageChange = (e: PaginatorPageChangeEvent, index: number) => {
        setFirst(first.map((f, i) => (index === i ? e.first : f)));
        setRows(rows.map((r, i) => (index === i ? e.rows : r)));
        setCurrentPage(e.page + 1)
    };


    const paginationTemplate = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 120, value: 120 }
            ];

            return (
                <React.Fragment>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                        {' '}
                    </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </React.Fragment>
            );
        },
        CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        }
    };

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-times" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    const header = (
        <h2>Servis Bilgileri Plaka: <span>[16 EG 1231 [BMW - X6]]</span></h2>
    )

    return (
        <Dialog header={header} style={{ width: '70vw' }} visible={visible} onHide={onHide} footer={footerContent}>
            <AddModal />
            <div className='card card-shadow mt-5'>
                <div className="table mt-2">
                    <DataTable value={bakim} columnResizeMode="expand" resizableColumns size='small' stripedRows
                        reorderableColumns reorderableRows onRowReorder={(e) => setBakim(e.value)}
                    >
                        <Column rowReorder style={{ width: '3rem' }} />
                        {columns.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} />
                        ))}
                    </DataTable>
                    <Paginator template={paginationTemplate} first={first[0]} rows={rows[0]} totalRecords={0} onPageChange={(e) => onPageChange(e, 0)} />
                </div>
            </div>
        </Dialog>
    )
}

export default BakimModal

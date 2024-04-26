import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import AddModal from './components/AddModal'
import { Paginator } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';

const columns = [
    { field: 'tarih', header: 'TARİH' },
    { field: 'saat', header: 'SAAT' },
    { field: 'yakitTipi', header: 'YAKIT TİPİ' },
    { field: 'miktar', header: 'MİKTAR' },
    { field: 'tutar', header: 'TUTAR' },
    { field: 'sonKm', header: 'SON KM' },
    { field: 'alinanKm', header: 'Alınan Km' },
    { field: 'tuketim', header: 'TÜKETİM' },
    { field: 'servisKm', header: 'SERVİS KM.' },
    { field: 'farkKm', header: 'FARK KM.' },
    { field: 'istasyon', header: 'İSTASYON' },
    { field: 'bolge', header: 'BÖLGE' },
    { field: 'faturaNo', header: 'FATURA NO' },
    { field: 'surucuAdi', header: 'SÜRÜCÜ ADI' },
    { field: 'aciklama', header: 'AÇIKLAMA' },
];

const YakitModal = ({ visible, setVisible }) => {
    const [yakit, setYakit] = useState([
        { tarih: 'tarih', saat: 'saat', yakitTipi: 'yakitTipi', miktar: 'miktar', tutar: 'tutar', sonKm: 'sonKm', alinanKm: 'alinanKm', tuketim: 'tuketim', servisKm: 'servisKm', farkKm: 'farkKm', istasyon: 'istasyon', bolge: 'bolge', faturaNo: 'faturaNo', surucuAdi: 'surucuAdi', aciklama: 'aciklama',}
    ]);
    // const [selectedData, setSelectedData] = useState(null);
    // const [visibleColumns, setVisibleColumns] = useState(columns);
    // pagination
    const [first, setFirst] = useState([0, 0, 0]);
    const [rows, setRows] = useState([10, 10, 10]);
    const [currentPage, setCurrentPage] = useState(1);


    const onHide = () => {
        setVisible(false);
    };

    const onPageChange = (e, index) => {
        setFirst(first.map((f, i) => (index === i ? e.first : f)));
        setRows(rows.map((r, i) => (index === i ? e.rows : r)));
        setCurrentPage(e.page + 1)
    };

    const paginationTemplate = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options) => {
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
        CurrentPageReport: (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        }
    };

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kapat" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    const header = (
        <h2>Servis Bilgileri Plaka: <span>[16 EG 1231 [BMW - X6]]</span></h2>
    )

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
    });

    return (
        <Dialog header={header} style={{ width: '70vw' }} visible={visible} onHide={onHide} footer={footerContent}>
            <AddModal />
            <div className='card card-shadow mt-5'>
                <div className="table mt-2">
                    <DataTable value={yakit} columnResizeMode="expand" resizableColumns size='small' stripedRows
                        reorderableColumns reorderableRows onRowReorder={(e) => setYakit(e.value)}
                    >
                        <Column rowReorder style={{ width: '3rem' }} />
                        {dynamicColumns}
                    </DataTable>
                    <Paginator template={paginationTemplate} first={first[0]} rows={rows[0]} totalRecords={0} onPageChange={(e) => onPageChange(e, 0)} />
                </div>
            </div>
        </Dialog>
    )
}

export default YakitModal

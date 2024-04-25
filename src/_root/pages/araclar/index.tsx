import React, { useEffect, useState, useRef } from 'react'
import { AraclarFilterService, AraclarSearchService, AraclarService } from '../../../api/service'
import 'primereact/resources/primereact.min.css'
// types
import { IAraclar } from '../../../types/index'
// components
import { DataTable } from 'primereact/datatable'
import {
  Paginator, PaginatorPageChangeEvent, PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions
} from 'primereact/paginator';
import { Column } from 'primereact/column'
import BreadCrumbComp from '../../components/BreadCrumbComp'
import AddModal from './components/add-modal/AddModal'
import Operations from './components/operations'
import { InputText } from "primereact/inputtext";
import ControlRows from './components/control-rows'
import FilterRows from './components/filter'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button'
interface ColumnMeta {
  field: string;
  header: string;
}
const columns: ColumnMeta[] = [
  { field: 'aracId', header: 'ARAÇ ID' },
  { field: 'plaka', header: 'ARAÇ PLAKA' },
  { field: 'aracTip', header: 'ARAÇ TİP' },
  { field: 'marka', header: 'MARKA' },
  { field: 'model', header: 'MODEL' },
  { field: 'grup', header: 'GRUP' },
  { field: 'renk', header: 'RENK' },
  { field: 'yil', header: 'ÜRETİM YILI' },
  { field: 'yakitTip', header: 'YAKIT TİPİ' },
];

const Araclar = () => {
  const [vehicles, setVehicles] = useState<IAraclar[]>([]);
  const [vehiclesCount, setVehiclesCount] = useState<number>(0);
  const [selectedVehicles, setSelectedVehicles] = useState<number>(0);
  const [search, setSearch] = useState("")
  // pagination
  const [first, setFirst] = useState<number[]>([0, 0, 0]);
  const [rows, setRows] = useState([10, 10, 10]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (search.length >= 3) {
      AraclarSearchService(search, currentPage).then(res => {
        setVehicles(res.data.vehicleList)
        setVehiclesCount(res.data.vehicleCount)
      })
    } else {
      AraclarSearchService(search, currentPage).then(res => {
        setVehicles(res.data.vehicleList)
        setVehiclesCount(res.data.vehicleCount)
      })
    }
  }

  const handleSearchForFilters = (data) => {
    AraclarFilterService(search, data).then(res => {
      setVehicles(res.data.vehicleList)
      setVehiclesCount(res.data.vehicleCount)
    })
  }

  useEffect(() => {
    AraclarSearchService(search, currentPage).then(res => {
      setVehicles(res.data.vehicleList)
      setVehiclesCount(res.data.vehicleCount)
    })
  }, [currentPage])

  const onPageChange = (e: PaginatorPageChangeEvent, index: number) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)));
    setRows(rows.map((r, i) => (index === i ? e.rows : r)));
    setCurrentPage(e.page + 1)
  };

  const clear = () => {
    AraclarSearchService(search, currentPage).then(res => {
      setVehicles(res.data.vehicleList)
      setVehiclesCount(res.data.vehicleCount)
    })
  }


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

  return (
    <>
      <BreadCrumbComp items={[{ label: 'ARAÇ LİSTESİ' }]} />
      <div className="card card-shadow mt-5">
        <div className="flex justify-content-between align-items-center">
          <div className='flex align-items-center'>
            <ControlRows />
            <InputText v-model="value1" placeholder="Search" onChange={handleSearch} />
            <AddModal />
            <FilterRows columns={columns} handleSearchForFilters={handleSearchForFilters} />
            <Button
              className="filtre-btn ml-2"
              label="Temizle"
              onClick={clear}
            />
          </div>
          <div>
            <Operations />
          </div>
        </div>
      </div>
      <div className='card card-shadow mt-5'>
        <div className="table mt-2">
          <DataTable value={vehicles} columnResizeMode="expand" resizableColumns size='small' stripedRows
            selectionMode='multiple' selection={selectedVehicles} onSelectionChange={(e) => setSelectedVehicles(e.value)}
            reorderableColumns reorderableRows onRowReorder={(e) => setVehicles(e.value)}
          >
            <Column rowReorder style={{ width: '3rem' }} />
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            {columns.map((col, index) => (
              <Column key={index} field={col.field} header={col.header} />
            ))}
          </DataTable>
          <Paginator template={paginationTemplate} first={first[0]} rows={rows[0]} totalRecords={vehiclesCount} onPageChange={(e) => onPageChange(e, 0)} />
        </div>
      </div>
    </>

  )
}

export default Araclar

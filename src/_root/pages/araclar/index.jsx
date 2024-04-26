import React, { useEffect, useState } from 'react'
import { AraclarFilterService, AraclarSearchService } from '../../../api/service'
import 'primereact/resources/primereact.min.css'
// components
import { DataTable } from 'primereact/datatable'
import {
  Paginator,
} from 'primereact/paginator'
import { Column } from 'primereact/column'
import BreadCrumbComp from '../../components/BreadCrumbComp'
import AddModal from './components/add-modal/AddModal'
import Operations from './components/operations'
import { InputText } from "primereact/inputtext";
import ControlRows from './components/control-rows'
import { Dropdown } from 'primereact/dropdown'
import FilterRows from './components/filter'
import { MultiSelect } from 'primereact/multiselect'

const columns = [
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
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [selectedVehicles, setSelectedVehicles] = useState(0);
  const [search, setSearch] = useState("")
  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [visible, setVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // pagination
  const [first, setFirst] = useState([0, 0, 0]);
  const [rows, setRows] = useState([10, 10, 10]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (search.length >= 3) {
      AraclarSearchService(search, currentPage).then(res => {
        console.log(res.data)
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
    console.log(data)
    AraclarFilterService(search, data).then(res => {
      console.log(res.data)
      setVehicles(res.data.vehicleList)
      setVehiclesCount(res.data.vehicleCount)
    })
  }

  useEffect(() => {
    if (currentPage === 1) {
      AraclarSearchService(search).then(res => {
        setVehicles(res.data.vehicleList)
        setVehiclesCount(res.data.vehicleCount)
      })
    } else {
      AraclarSearchService(search, currentPage).then(res => {
        setVehicles(res.data.vehicleList)
        setVehiclesCount(res.data.vehicleCount)
      })
    }
  }, [currentPage])


  const onPageChange = (e, index) => {
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

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    setVisibleColumns(orderedSelectedColumns);
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

  const dynamicColumns = visibleColumns.map((col, i) => {
    return <Column key={col.field} columnKey={col.field} field={col.field} header={col.header} />;
  });

  const header = <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />;

  return (
    <>
      <BreadCrumbComp items={[{ label: 'ARAÇ LİSTESİ' }]} />
      <div className="card card-shadow mt-5">
        <div className="flex justify-content-between align-items-center">
          <div className='flex align-items-center'>
            <ControlRows header={header} />
            <InputText v-model="value1" placeholder="Search" onChange={handleSearch} />
            <AddModal />
            <FilterRows columns={columns} handleSearchForFilters={handleSearchForFilters} clear={clear} />
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
            {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} /> */}
            {dynamicColumns}
          </DataTable>
          <Paginator template={paginationTemplate} first={first[0]} rows={rows[0]} totalRecords={vehiclesCount} onPageChange={(e) => onPageChange(e, 0)} />
        </div>
      </div>
    </>

  )
}

export default Araclar

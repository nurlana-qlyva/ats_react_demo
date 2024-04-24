import { useEffect, useState, useRef } from 'react'
import { AraclarService } from '../../../api/service'
import 'primereact/resources/primereact.min.css'
// types
import { IAraclar } from '../../../types/index'
// components
import { DataTable } from 'primereact/datatable'
import {
  Paginator, PaginatorPageChangeEvent, PaginatorJumpToPageInputOptions, PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions,
  PaginatorLastPageLinkOptions, PaginatorNextPageLinkOptions, PaginatorPageLinksOptions, PaginatorPrevPageLinkOptions, PaginatorFirstPageLinkOptions
} from 'primereact/paginator';
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import BreadCrumbComp from '../../components/BreadCrumbComp'
import AddModal from './components/add-modal/AddModal'
import Operations from './components/operations'
import { InputText } from "primereact/inputtext";
import ControlRows from './components/control-rows'
import FilterRows from './components/filter'

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
  { field: 'yakiTip', header: 'YAKIT TİPİ' },
];

const Araclar = () => {
  const [araclar, setAraclar] = useState<IAraclar[]>([]);
  const [selectedAraclar, setSelectedAraclar] = useState<IAraclar[] | null>(null);

  useEffect(() => {
    AraclarService().then(res => setAraclar(res.data))
  }, [])

  return (
    <>
      <BreadCrumbComp items={[{ label: 'ARAÇ LİSTESİ' }]} />
      <div className="card card-shadow mt-5">
        <div className="flex justify-content-between align-items-center">
          <div className='flex align-items-center'>
            <ControlRows />
            <InputText v-model="value1" placeholder="Search" />
            <AddModal />
            <FilterRows />
          </div>
          <div>
            <Operations />
          </div>
        </div>
      </div>
      <div className='card card-shadow mt-5'>
        <div className="table mt-2">
          <DataTable value={araclar} scrollable columnResizeMode="expand" resizableColumns size='small' stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            selectionMode='multiple' selection={selectedAraclar} onSelectionChange={(e) => setSelectedAraclar(e.value)}
            reorderableColumns reorderableRows onRowReorder={(e) => setAraclar(e.value)}
          >
            <Column rowReorder style={{ width: '3rem' }} />
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            {columns.map((col, index) => (
              <Column key={index} field={col.field} header={col.header} sortable />
            ))}
          </DataTable>
        </div>
      </div>
    </>

  )
}

export default Araclar

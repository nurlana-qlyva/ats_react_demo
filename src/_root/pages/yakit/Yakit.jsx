import { createContext, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable'
import { HomeOutlined, MenuOutlined } from '@ant-design/icons'
import { Modal, Button, Table, Tabs, message, Checkbox, Popover, Input } from 'antd'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'
import { YakitGetService } from '../../../api/service'
import AddModal from './add/AddModal'
import { PlakaContext } from '../../../context/plakaSlice'

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: 'Yakıt İşlemleri',
    },
]

const DragIndexContext = createContext({
    active: -1,
    over: -1,
})
const dragActiveStyle = (dragState, id) => {
    const { active, over, direction } = dragState
    let style = {}
    if (active && active === id) {
        style = {
            backgroundColor: 'gray',
            opacity: 0.5,
        };
    }
    else if (over && id === over && active !== over) {
        style =
            direction === 'right'
                ? {
                    borderRight: '1px dashed gray',
                }
                : {
                    borderLeft: '1px dashed gray',
                };
    }
    return style;
}
const TableBodyCell = (props) => {
    const dragState = useContext(DragIndexContext);
    return (
        <td
            {...props}
            style={{
                ...props.style,
                ...dragActiveStyle(dragState, props.id),
            }}
        />
    );
}
const TableHeaderCell = (props) => {
    const dragState = useContext(DragIndexContext);
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: props.id,
    });
    const style = {
        ...props.style,
        cursor: 'move',
        ...(isDragging
            ? {
                position: 'relative',
                zIndex: 9999,
                userSelect: 'none',
            }
            : {}),
        ...dragActiveStyle(dragState, props.id),
    };
    return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
}

const Yakit = () => {
    const [dataSource, setDataSource] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dragIndex, setDragIndex] = useState({
        active: -1,
        over: -1,
    })
    const [openRowHeader, setOpenRowHeader] = useState(false)
    const [status, setStatus] = useState(false)
    const { setPlaka } = useContext(PlakaContext)

    useEffect(() => {
        setLoading(true)
        YakitGetService(tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.fuel_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            })
            setLoading(false)
        })
    }, [tableParams?.pagination.current])

    useEffect(() => setPlaka(selectedRowKeys), [selectedRowKeys])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1)
        }
    }

    const baseColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            key: 1,
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            key: 2,
            render: (text, record) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: 'Yakıt Tipi',
            dataIndex: 'yakitTip',
            key: 3,
        },
        {
            title: 'Alınan KM.',
            dataIndex: 'alinanKm',
            key: 4,
        },
        {
            title: 'Kullanım',
            dataIndex: 'ozelKullanim',
            key: 5,
            render: (text, record) => <Checkbox checked={record.ozelKullanim} readOnly />
        },
        {
            title: 'Miktar',
            dataIndex: 'miktar',
            key: 6,
            render: (text, record) => <div className=''>
                <span>{text} </span>
                <span style={{ fontSize: '14px', color: 'rgb(147 147 147)' }}>{record.birim === "LITRE" && 'lt'}</span>
            </div>
        },
        {
            title: 'Tutar',
            dataIndex: 'tutar',
            key: 7,
        },
        {
            title: 'Ortalama Tüketim',
            dataIndex: 'tuketim',
            key: 8,
        },
        {
            title: 'Km Başına Maliyet',
            dataIndex: '',
            key: 9,
        },
        {
            title: 'Full Depo',
            dataIndex: 'tuketim',
            key: 10,
            render: (text, record) => <Checkbox checked={record.fullDepo} readOnly />
        },
        {
            title: 'Stoktan Kullanım',
            dataIndex: 'stokKullanimi',
            key: 11,
            render: (text, record) => <Checkbox checked={record.stokKullanimi} readOnly />
        },
        {
            title: 'Sürücü',
            dataIndex: 'surucuAdi',
            key: 12,
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
            key: 13,
        },
        {
            title: 'İstasyon',
            dataIndex: 'istasyon',
            key: 14,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 15,
        }
    ]

    const [columns, setColumns] = useState(() =>
        baseColumns.map((column, i) => ({
            ...column,
            key: `${i}`,
            onHeaderCell: () => ({
                id: `${i}`,
            }),
            onCell: () => ({
                id: `${i}`,
            }),
        })),
    )
    const defaultCheckedList = columns.map((item) => item.key)
    const [checkedList, setCheckedList] = useState(defaultCheckedList)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    )
    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setColumns((prevState) => {
                const activeIndex = prevState.findIndex((i) => i.key === active?.id);
                const overIndex = prevState.findIndex((i) => i.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
        setDragIndex({
            active: -1,
            over: -1,
        });
    }
    const onDragOver = ({ active, over }) => {
        const activeIndex = columns.findIndex((i) => i.key === active.id);
        const overIndex = columns.findIndex((i) => i.key === over?.id);
        setDragIndex({
            active: active.id,
            over: over?.id,
            direction: overIndex > activeIndex ? 'right' : 'left',
        });
    }

    const handleOpenChange = (newOpen) => {
        setOpenRowHeader(newOpen);
    }

    const newColumns = columns.map(col => (
        {
            ...col,
            hidden: !checkedList.includes(col.key),
        }
    ))

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }))

    const content = (
        <>
            <Checkbox.Group
                value={checkedList}
                options={options}
                onChange={(value) => {
                    if (value.length > 0) {
                        setCheckedList(value);
                    }
                }}
            />
        </>
    )
    return (
        <>
            <div className="content">
                <BreadcrumbComp items={breadcrumb} />
            </div>

            <div className="content">
                <div className="flex justify-between align-center">
                    <div className="flex align-center gap-1">
                        <Popover
                            content={content}
                            placement="bottom"
                            trigger="click"
                            open={openRowHeader}
                            onOpenChange={handleOpenChange}
                        >
                            <Button className="btn primary-btn"><MenuOutlined /></Button>
                        </Popover>
                        {/* <Input placeholder="Arama" onChange={e => setSearch(e.target.value)} /> */}
                        <Input placeholder="Arama" />
                        <AddModal />
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                </div>
            </div>

            <div className="content">
                <p className="count">[ {tableParams?.pagination.total} kayıt ]</p>
                <DndContext
                    sensors={sensors}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    collisionDetection={closestCenter}
                >
                    <SortableContext items={columns.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                        <DragIndexContext.Provider value={dragIndex}>
                            <Table
                                rowKey={(record) => record.aracId}
                                columns={newColumns}
                                dataSource={dataSource}
                                pagination={tableParams.pagination}
                                loading={loading}
                                size="small"
                                onChange={handleTableChange}
                                scroll={{
                                    x: 1500,
                                }}
                                rowSelection={{
                                    selectedRowKeys: selectedRowKeys,
                                    onChange: (selectedRowKeys, keys) => {
                                        setSelectedRowKeys(selectedRowKeys);
                                    },
                                    onSelectAll: (selected, selectedRows, changeRows) => {
                                        const keys = changeRows.map((row) => row.aracId);
                                        setSelectedRowKeys(selected ? keys : []);
                                    },
                                }}
                            />
                        </DragIndexContext.Provider>
                    </SortableContext>
                    <DragOverlay>
                        <th
                            style={{
                                backgroundColor: 'gray',
                                padding: 16,
                            }}
                        >
                            {columns[columns.findIndex((i) => i.key === dragIndex.active)]?.title}
                        </th>
                    </DragOverlay>
                </DndContext>
            </div>

        </>
    )
}

export default Yakit

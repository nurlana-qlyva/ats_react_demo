import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
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
import dayjs from 'dayjs'
import { Checkbox, Table, Popover, Button, Input } from 'antd'
import { MenuOutlined, HomeOutlined } from '@ant-design/icons'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'
import AddModal from './add/AddModal'
// import UpdateModal from './update/UpdateModal'

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: t('girisFisleri'),
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
    } else if (over && id === over && active !== over) {
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
    )
}

TableBodyCell.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
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

TableHeaderCell.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
}

const GirisFisleri = () => {
    const [data, setData] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const [loading, setLoading] = useState(false)
    const [dragIndex, setDragIndex] = useState({
        active: -1,
        over: -1,
    })
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState(false)
    const [openRowHeader, setOpenRowHeader] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [record, setRecord] = useState(false)

    const baseColumns = [
        {
            title: t('tarih'),
            dataIndex: 'tarih',
            key: 1,
            render: (text) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: t('fisNo'),
            dataIndex: 'fisNo',
            key: 2,
        },
        {
            title: t('firmaTanimi'),
            dataIndex: 'tanim',
            key: 3,
        },
        {
            title: t('plaka'),
            dataIndex: 'plaka',
            key: 3,
        },
        {
            title: t('islemTipi'),
            dataIndex: 'islemTipi',
            key: 4,
        },
        {
            title: t('girisDeposu'),
            dataIndex: 'girisDeposu',
            key: 5,
        },
        {
            title: t('cikisDeposu'),
            dataIndex: 'cikisDeposu',
            key: 6,
        },
        {
            title: t('araToplam'),
            dataIndex: 'araToplam',
            key: 7,
        },
        {
            title: t('kdvToplam'),
            dataIndex: 'kdvToplam',
            key: 8,
        },
        {
            title: t('genelToplam'),
            dataIndex: 'genelToplam',
            key: 9,
        },
        {
            title: t('faturaIrsaliyeNo'),
            dataIndex: 'faturaIrsaliyeNo',
            key: 10,
        },
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

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const defaultCheckedList = columns.map((item) => item.key)
    const [checkedList, setCheckedList] = useState(defaultCheckedList)

    useEffect(() => {
        // setLoading(true)
        // MalzemeListGetService(tableParams?.pagination.current).then(res => {
        //     setData(res?.data.materialList)
        //     setTableParams({
        //         ...tableParams,
        //         pagination: {
        //             ...tableParams.pagination,
        //             total: res?.data.total_count,
        //         },
        //     });
        //     setLoading(false);
        // })
    }, [tableParams.pagination.current, status]);

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

    const handleTableChange = (pagination, filters, sorter) => {
        setLoading(true)
        // VehiclesReadForPageService(search, pagination.current).then(res => {
        //     setVehiclesData(res.data.vehicleList)
        //     setLoading(false)
        // })
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
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

    // get selected rows data
    if (!localStorage.getItem('selectedRowKeys')) localStorage.setItem('selectedRowKeys', JSON.stringify([]))
    const [keys, setKeys] = useState([])
    const [rows, setRows] = useState([])
    const handleRowSelection = (row, selected) => {
        console.log(row)
        if (selected) {
            if (!keys.includes(row.malzemeId)) {
                setKeys([...keys, row.malzemeId])
                setRows([...rows, row])
            }
        } else {
            const filteredKeys = keys.filter(key => key !== row.malzemeId)
            const filteredRows = rows.filter(item => item.malzemeId !== row.malzemeId)
            setKeys(filteredKeys)
            setRows(filteredRows)
        }
    }
    useEffect(() => localStorage.setItem('selectedRowKeys', JSON.stringify(keys)), [keys])
    // useEffect(() => {
    //     let newPlakaEntries = [];
    //     rows.forEach(vehicle => {
    //         if (!newPlakaEntries.some(item => item.id === vehicle.malzemeId)) {
    //             newPlakaEntries.push({ id: vehicle.malzemeId, plaka: vehicle.plaka });
    //         }
    //     });
    //     // setPlaka(newPlakaEntries);
    // }, [rows])
    useEffect(() => {
        const storedSelectedKeys = JSON.parse(localStorage.getItem('selectedRowKeys'));
        if (storedSelectedKeys && storedSelectedKeys.length) {
            setSelectedRowKeys(storedSelectedKeys);
        }
    }, [tableParams.pagination.current])

    useEffect(() => {
        localStorage.setItem('selectedRowKeys', JSON.stringify([]))
        setSelectedRowKeys([])
    }, [])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('selectedRowKeys')).length !== 0) {
            setSelectedRowKeys(JSON.parse(localStorage.getItem('selectedRowKeys')))
        }
    }, [tableParams.pagination.current, localStorage.getItem('selectedRowKeys')])

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
                            onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}
                        >
                            <Button className="btn primary-btn"><MenuOutlined /></Button>
                        </Popover>
                        <Input placeholder={t("arama")} onChange={e => setSearch(e.target.value)} />
                        <AddModal setStatus={setStatus} />
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                    <div>
                        {/* <OperationsInfo ids={selectedRowKeys} /> */}
                    </div>
                </div>
            </div>
            {/* <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} setStatus={setStatus} status={status} id={record.malzemeId} /> */}
            <div className="content">
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
                                rowKey={(record) => record.malzemeId}
                                columns={newColumns}
                                dataSource={data}
                                pagination={{
                                    ...tableParams.pagination,
                                    showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
                                    locale: {
                                        items_per_page: `/ ${t('sayfa')}`,
                                    },
                                }}
                                loading={loading}
                                size="small"
                                onChange={handleTableChange}
                                // scroll={{
                                //     x: 2500
                                // }}
                                rowSelection={{
                                    selectedRowKeys: selectedRowKeys,
                                    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                                    onSelect: handleRowSelection
                                }}
                                components={{
                                    header: {
                                        cell: TableHeaderCell,
                                    },
                                    body: {
                                        cell: TableBodyCell,
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

export default GirisFisleri

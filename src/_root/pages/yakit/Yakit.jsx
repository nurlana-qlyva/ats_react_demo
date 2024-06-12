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
import { Checkbox, Table, Popover, Button, Input, Popconfirm } from 'antd'
import { MenuOutlined, HomeOutlined, DeleteOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { YakitDataDeleteService, YakitGetService } from '../../../api/service'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'
import AddModal from './add/AddModal'
import UpdateModal from './update/UpdateModal'

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: t('yakitIslemleri'),
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

const Yakit = () => {
    const [dataSource, setDataSource] = useState([])
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
    const [id, setId] = useState(0)

    useEffect(() => {
        setLoading(true);
        YakitGetService(tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.fuel_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
            setLoading(false);
        });
    }, [tableParams.pagination.current, status])

    const handleDelete = (data) => {
        YakitDataDeleteService(data.siraNo).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setStatus(false);
    }

    const baseColumns = [
        {
            title: t('plaka'),
            dataIndex: 'plaka',
            key: 1,
            render: (text, record) => (
                <Button onClick={() => {
                    setUpdateModal(true)
                    setId(record.siraNo)
                }}>{text}</Button>
            )
        },
        {
            title: t('tarih'),
            dataIndex: 'tarih',
            key: 2,
            render: (text) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: t('yakitTip'),
            dataIndex: 'yakitTip',
            key: 3,
        },
        {
            title: t('alinanKm'),
            dataIndex: 'sonAlinanKm',
            key: 4,
        },
        {
            title: t('kullanim'),
            dataIndex: 'ozelKullanim',
            key: 5,
            render: (text, record) => <Checkbox checked={record.ozelKullanim} readOnly />
        },
        {
            title: t('miktar'),
            dataIndex: 'miktar',
            key: 6,
            render: (text, record) => (
                <div className=''>
                    <span>{text} </span>
                    <span style={{ fontSize: '14px', color: 'rgb(147 147 147)' }}>{record.birim === "LITRE" && 'lt'}</span>
                </div>
            )
        },
        {
            title: t('tutar'),
            dataIndex: 'tutar',
            key: 7,
        },
        {
            title: t("ortalamaTuketim"),
            dataIndex: 'tuketim',
            key: 8,
            render: (text) => <p>{text} <ArrowUpOutlined style={{ color: 'red' }} /></p>
        },
        {
            title: t("kmBasinaMaliyet"),
            dataIndex: '',
            key: 9,
        },
        {
            title: t("fullDepo"),
            dataIndex: 'fullDepo',
            key: 10,
            render: (text, record) => <Checkbox checked={record.fullDepo} readOnly />
        },
        {
            title: t("stoktanKullanim"),
            dataIndex: 'stokKullanimi',
            key: 11,
            render: (text, record) => <Checkbox checked={record.stokKullanimi} readOnly />
        },
        {
            title: t('surucu'),
            dataIndex: 'surucuAdi',
            key: 12,
        },
        {
            title: t('lokasyon'),
            dataIndex: 'lokasyon',
            key: 13,
        },
        {
            title: t("istasyon"),
            dataIndex: 'istasyon',
            key: 14,
        },
        {
            title: t("aciklama"),
            dataIndex: 'aciklama',
            key: 15,
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 16,
            render: (_, record) => (
                <Popconfirm title={t("confirmQuiz")} cancelText={t("cancel")} okText={t("ok")} onConfirm={() => handleDelete(record)}>
                    <DeleteOutlined style={{ color: "#dc3545" }} />
                </Popconfirm>
            ),
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

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1);
        }
    }

    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const newColumns = columns.map(col => (
        {
            ...col,
            hidden: !checkedList.includes(col.key),
        }
    ))

    const options = columns
        // .filter(column => column.dataIndex !== 'delete')
        .map(({ key, title }) => ({
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
                        <Input placeholder="Arama" onChange={e => setSearch(e.target.value)} />
                        <AddModal setStatus={setStatus} />
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                    <div>
                        {/* <OperationsInfo ids={selectedRowKeys} /> */}
                    </div>
                </div>
            </div>

            <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} setStatus={setStatus} status={status} id={id} />

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
                                dataSource={dataSource}
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
                                scroll={{
                                    x: 2500
                                }}
                                // rowSelection={{
                                //     selectedRowKeys: selectedRowKeys,
                                //     onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                                //     onSelect: handleRowSelection
                                // }}
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

export default Yakit

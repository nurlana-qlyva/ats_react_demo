import { createContext, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { Checkbox, Table, Popover, Button, Input } from 'antd'
import { MenuOutlined, HomeOutlined } from '@ant-design/icons'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: t('malzemeTanimlari'),
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

const MalzemeTanimlari = () => {
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
    const baseColumns = [
        {
            title: t('malzemeKodu'),
            dataIndex: 'malzemeKodu',
            key: 1,
            // render: (text, record) => <Link to={`/detay/${record.aracId}`}>{text}</Link>
        },
        {
            title: t('malzemeTanimi'),
            dataIndex: 'malzemeTanimi',
            key: 2,
        },
        {
            title: t('malzemeTipi'),
            dataIndex: 'malzemeTipi',
            key: 3,
        },
        {
            title: t('stokMiktar'),
            dataIndex: 'stokMiktar',
            key: 4,
        },
        {
            title: t('birim'),
            dataIndex: 'birim',
            key: 5,
        },
        {
            title: t('fiyat'),
            dataIndex: 'fiyat',
            key: 6,
        },
        {
            title: t('tedarikci'),
            dataIndex: 'tedarikci',
            key: 6,
        },
        {
            title: t('seriNo'),
            dataIndex: 'seriNo',
            key: 7,
        },
        {
            title: t('barkodNo'),
            dataIndex: 'barkodNo',
            key: 8,
        },
        {
            title: t('aciklama'),
            dataIndex: 'aciklama',
            key: 9,
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
                        // onOpenChange={handleOpenChange}
                        >
                            <Button className="btn primary-btn"><MenuOutlined /></Button>
                        </Popover>
                        <Input placeholder="Arama" onChange={e => setSearch(e.target.value)} />
                        {/* <AddModal setStatus={setStatus} data={vehiclesData} /> */}
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                    <div>
                        {/* <OperationsInfo ids={selectedRowKeys} /> */}
                    </div>
                </div>
            </div>

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
                                rowKey={(record) => record.aracId}
                                columns={newColumns}
                                // dataSource={vehiclesData}
                                pagination={{
                                    ...tableParams.pagination,
                                    showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
                                    locale: {
                                        items_per_page: `/ ${t('sayfa')}`,
                                    },
                                }}
                                loading={loading}
                                size="small"
                                // onChange={handleTableChange}
                                rowSelection={{
                                    selectedRowKeys: selectedRowKeys,
                                    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                                    // onSelect: handleRowSelection
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

export default MalzemeTanimlari

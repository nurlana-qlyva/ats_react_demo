import { createContext, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from '@dnd-kit/sortable';
// antd
import { Checkbox, Table, Popover, Button, Input, Spin } from 'antd';
import { MenuOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons"
// services
import { VehiclesReadForFilterService, VehiclesReadForPageService, VehiclesReadForSearchService } from "../../../api/service";
// components
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import AddModal from "./add/AddModal";
import Filter from "./filter/Filter";
import OperationsInfo from "./operations/OperationsInfo";


const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: 'Araçlar',
    },
]

const DragIndexContext = createContext({
    active: -1,
    over: -1,
});
const dragActiveStyle = (dragState, id) => {
    const { active, over, direction } = dragState;
    // drag active style
    let style = {};
    if (active && active === id) {
        style = {
            backgroundColor: 'gray',
            opacity: 0.5,
        };
    }
    // dragover dashed style
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
};
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
};
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
};

const Vehicles = () => {
    const [dragIndex, setDragIndex] = useState({
        active: -1,
        over: -1,
    });
    const baseColumns = [
        {
            title: 'Araç İD',
            dataIndex: 'aracId',
            key: 1,
            render: (text, record) => <Link to={`/detay/${record.aracId}`}>{text}</Link>
        },
        {
            title: 'Araç Plaka',
            dataIndex: 'plaka',
            key: 2,
        },
        {
            title: 'Araç Tip',
            dataIndex: 'aracTip',
            key: 3,
        },
        {
            title: 'Marka',
            dataIndex: 'marka',
            key: 4,
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 5,
        },
        {
            title: 'Grup',
            dataIndex: 'grup',
            key: 6,
        },
        {
            title: 'Güncel Km',
            dataIndex: 'guncelKm',
            key: 6,
        },
        {
            title: 'Renk',
            dataIndex: 'renk',
            key: 7,
        },
        {
            title: 'Üretim Yılı',
            dataIndex: 'yil',
            key: 8,
        },
        {
            title: 'Yakıt Tipi',
            dataIndex: 'yakitTip',
            key: 9,
        },
    ];

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
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [vehiclesData, setVehiclesData] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
                distance: 1,
            },
        }),
    );
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
    };
    const onDragOver = ({ active, over }) => {
        const activeIndex = columns.findIndex((i) => i.key === active.id);
        const overIndex = columns.findIndex((i) => i.key === over?.id);
        setDragIndex({
            active: active.id,
            over: over?.id,
            direction: overIndex > activeIndex ? 'right' : 'left',
        });
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    // get data
    useEffect(() => {
        setLoading(true);
        if (search.length >= 3) {
            VehiclesReadForSearchService(search).then(res => {
                setLoading(false);
                setVehiclesData(res?.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.vehicleCount,
                    },
                });
                setCount(res?.data.vehicleCount)
            })
        } else {
            VehiclesReadForSearchService("").then(res => {
                setLoading(false);
                setVehiclesData(res?.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.vehicleCount,
                    },
                });
                setCount(res?.data.vehicleCount)
            })
        }
    }, [search])

    useEffect(() => {
        setLoading(true)
        if (status) {
            VehiclesReadForSearchService("").then(res => {
                setLoading(false);
                setVehiclesData(res?.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.vehicleCount,
                    },
                });
                setCount(res?.data.vehicleCount)
            })
        }
    }, [status])

    const handleTableChange = (pagination, filters, sorter) => {
        setLoading(true)
        VehiclesReadForPageService(search, pagination.current).then(res => {
            setVehiclesData(res.data.vehicleList)
            setLoading(false)
        })
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setVehiclesData([]);
        }
    };

    const filter = (data) => {
        setLoading(true)

        VehiclesReadForFilterService(search, data).then(res => {
            setVehiclesData(res?.data.vehicleList)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.vehicleCount,
                },
            });
            setCount(res?.data.vehicleCount)
            setLoading(false)
        })
    }

    const clear = () => {
        setLoading(true)
        VehiclesReadForSearchService("").then(res => {
            setLoading(false);
            setVehiclesData(res?.data.vehicleList)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.vehicleCount,
                },
            });
            setCount(res?.data.vehicleCount)
        })
    }

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));

    const newColumns = columns.map(col => (
        {
            ...col,
            hidden: !checkedList.includes(col.key),
        }
    ))

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
            {loading && (
                <div className="loading-spin">
                    <div>
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 100,
                                    }}
                                    spin
                                />
                            }
                        />
                    </div>
                </div>
            )}

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
                            open={open}
                            onOpenChange={handleOpenChange}
                        >
                            <Button className="primary-btn"><MenuOutlined /></Button>
                        </Popover>
                        <Input placeholder="Arama" onChange={e => setSearch(e.target.value)} />
                        <AddModal setStatus={setStatus} data={vehiclesData} />
                        <Filter filter={filter} clearFilters={clear} />
                    </div>
                    <div>
                        <OperationsInfo ids={selectedRowKeys} />
                    </div>
                </div>
            </div>

            <div className="content">
                <p className="count">[ {count} kayıt ]</p>
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
                                dataSource={vehiclesData}
                                pagination={tableParams.pagination}
                                loading={loading}
                                size="small"
                                onChange={handleTableChange}
                                rowSelection={{
                                    selectedRowKeys: selectedRowKeys,
                                    onChange: (selectedRowKeys, selectedRows) => {
                                        setSelectedRowKeys(selectedRowKeys);
                                    },
                                    onSelectAll: (selected, selectedRows, changeRows) => {
                                        const keys = changeRows.map((row) => row.aracId);
                                        setSelectedRowKeys(selected ? keys : []);
                                    },
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

export default Vehicles

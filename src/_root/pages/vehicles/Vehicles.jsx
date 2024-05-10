import { useEffect, useState } from "react"
import { Checkbox, Table, Popover, Button, Input } from 'antd';
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { MenuOutlined, PlusOutlined, HomeOutlined } from "@ant-design/icons"
import { VehiclesReadForFilterService, VehiclesReadForPageService, VehiclesReadForSearchService } from "../../../api/service";
import AddModal from "./components/add/AddModal";
import Filter from "./components/filter/Filter";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import OperationsInfo from "./components/operations/OperationsInfo";

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: 'Araçlar',
    },
]

const Vehicles = () => {
    const columns = [
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [vehiclesData, setVehiclesData] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [search, setSearch] = useState("");
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const defaultValues = {
        aracId: "",
        plaka: "",
        model: "",
        marka: "",
        aracTip: "",
        grup: "",
        renk: "",
        yil: "",
        yakitTip: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

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
        VehiclesReadForPageService(search, pagination.current).then(res => {
            setVehiclesData(res.data.vehicleList)
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

    const handleSearchFilters = handleSubmit((values) => {
        if (!values.aracId && !values.aracTip && !values.model && !values.marka && !values.plaka && !values.yakitTip && !values.grup && !values.renk && !values.yil) {
            setHasValue(false)
        } else {
            setHasValue(true)
        }

        const data = {
            aracId: +values.aracId,
            plaka: values.plaka,
            model: values.modelFilter,
            marka: values.markaFilter,
            aracTip: values.aracTipFilter,
            grup: values.grupFilter,
            renk: values.renkFilter,
            yil: +values.yil,
            yakitTip: values.yakitFilter,
        }

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
        })
    })

    const clear = () => {
        reset();
        setHasValue(false)
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


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
                        <Filter setVehiclesData={setVehiclesData} control={control} setValue={setValue} handleSearchFilters={handleSearchFilters} clear={clear} hasValue={hasValue} />
                    </div>
                    <div>
                        <OperationsInfo />
                    </div>
                </div>
            </div>

            <div className="content">
                <p className="count">[ {count} kayıt ]</p>
                <Table
                    columns={newColumns}
                    dataSource={vehiclesData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    size="small"
                    onChange={handleTableChange}
                    rowSelection={rowSelection}
                />
            </div>
        </>
    )
}

export default Vehicles

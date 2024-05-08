import { useEffect, useState } from "react"
import { Checkbox, Table, Popover, Button, Input } from 'antd';
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { MenuOutlined, PlusOutlined, HomeOutlined } from "@ant-design/icons"
import { VehiclesReadForPageService, VehiclesReadForSearchService } from "../../../api/service";
import AddModal from "./components/add/AddModal";
import Filter from "./components/filter/Filter";
import { Link } from "react-router-dom";

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
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [vehiclesData, setVehiclesData] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    useEffect(() => {
        setLoading(true);
        if (search.length >= 3) {
            VehiclesReadForSearchService(search).then(res => {
                setLoading(false);
                setVehiclesData(res.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.data.vehicleCount,
                    },
                });
            })
        } else {
            VehiclesReadForSearchService("").then(res => {
                setLoading(false);
                setVehiclesData(res.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.data.vehicleCount,
                    },
                });
            })
        }
    }, [search])

    useEffect(() => {
        if (status) {
            VehiclesReadForSearchService("").then(res => {
                setLoading(false);
                setVehiclesData(res.data.vehicleList)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.data.vehicleCount,
                    },
                });
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
                <div className="flex justify-between">
                    <div className="flex align-items-center gap-1">
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
                        <Filter setVehiclesData={setVehiclesData} />
                    </div>
                    <div>
                        <Button className="info-btn"><PlusOutlined /> İşlemler</Button>
                    </div>
                </div>
            </div>

            <div className="content">
                <Table
                    columns={newColumns}
                    dataSource={vehiclesData}
                    pagination={tableParams.pagination}
                    loading={loading}
                    size="small"
                    onChange={handleTableChange}
                />
            </div>
        </>
    )
}

export default Vehicles

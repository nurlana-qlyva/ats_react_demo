import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons"
import Filter from "./filter/Filter";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { Controller, useForm } from "react-hook-form";
import ContextMenu from "./context-menu/ContextMenu";
import { KMDeleteService, KMGetService } from "../../../api/service";
import dayjs from "dayjs";

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: 'Hızlı Km Güncelleme',
    },
]

const EditableContext = createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};


const KmUpdate = () => {
    const [dataSource, setDataSource] = useState([]);
    const [hasValue, setHasValue] = useState(false);
    const [showContext, setShowContext] = useState(false);
    const [status, setStatus] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const defaultValues = {
        kmAracId: 0,
        seferSiraNo: 0,
        yakitSiraNo: 0,
        plaka: "",
        tarih: "1970-01-01",
        saat: "",
        eskiKm: 0,
        yeniKm: 0,
        fark: 0,
        kaynak: "",
        dorse: false,
        aciklama: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    const deleteRow = (e) => {
        const data = {
            "siraNo": e.siraNo,
            "kmAracId": e.kmAracId
        }

        KMDeleteService(data).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
    }

    const defaultColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            editable: true,
        },
        {
            title: 'Araç Tipi',
            dataIndex: 'aracTip',
        },
        {
            title: 'Marka',
            dataIndex: 'marka',
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
        },
        {
            title: 'Departman',
            dataIndex: 'departman',
        },
        {
            title: 'Güncel km',
            dataIndex: 'eskiKm',
        },
        {
            title: 'Yeni km',
            dataIndex: 'yeniKm',
            editable: true,
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            render: (text) => dayjs(text).locale('tr').format('DD MMMM YYYY'),
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Button onClick={() => deleteRow(record)}><DeleteOutlined /></Button>
                ) : null,
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const handleOutsideClick = (e) => {
        if (!e.target.closest('.context-menu')) {
            setShowContext(false);
        }
    };

    useEffect(() => {
        KMGetService(tableParams.pagination.current).then(res => {
            setDataSource(res?.data.km_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
        })
    }, [status, tableParams.pagination.current])

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleSave = async (row) => {
        try {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => row.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            setDataSource(newData);
    
            const updatedValue = row;
    
            console.log('Updated value:', updatedValue);
            
        } catch (error) {
            console.error('Error saving row:', error);
        }
    };   
    

    const handleTableChange = (pagination, filters, sorter) => {
        KMGetService(pagination.current).then(res => {
            setDataSource(res?.data.km_list)
        })
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <>
            <div className='content'>
                <BreadcrumbComp items={breadcrumb} />
            </div>

            <div className="content">
                <Filter setDataSource={setDataSource} control={control} setTableParams={setTableParams} tableParams={tableParams} />
            </div>

            <div className="content">
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    pagination={tableParams.pagination}
                    // bordered
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    onChange={handleTableChange}
                />
            </div>
        </>
    )
}

export default KmUpdate

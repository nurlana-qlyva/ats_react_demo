import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons"
import Filter from "./filter/Filter";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, Table } from 'antd';
import { useForm } from "react-hook-form";
import ContextMenu from "./context-menu/ContextMenu";
import { KMDeleteService, KMGetService, KMUpdateService } from "../../../api/service";
import dayjs from "dayjs";
import { formatDate } from "../../../utils/format";

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

const KmUpdate = () => {
    const [dataSource, setDataSource] = useState([]);
    const [showContext, setShowContext] = useState(false);
    const [status, setStatus] = useState(false)
    const [errorRows, setErrorRows] = useState({});
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        errorRows,
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
                [dataIndex]: dataIndex === "tarih" ? record[dataIndex].split("T")[0] : record[dataIndex],
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
                    className={`editable-cell-value-wrap`}
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        const rowStyle = record?.tarih === errorRows?.tarih && errorRows?.error ? 'red-text' : ''

        return <td {...restProps} className={rowStyle}>{childNode}</td>;
    };


    const defaultValues = {
        kmAracId: 0,
        seferSiraNo: 0,
        yakitSiraNo: 0,
        plaka: "",
        tarih: new Date(),
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

    // const deleteRow = (e) => {
    //     const data = {
    //         "siraNo": e.siraNo,
    //         "kmAracId": e.kmAracId
    //     }

    //     KMDeleteService(data).then(res => {
    //         if (res?.data.statusCode === 202) {
    //             setStatus(true)
    //         }
    //     })
    // }

    const defaultColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
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
            editable: true,
            render: (text) => dayjs(text).locale('tr').format('DD MMMM YYYY'),
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
            editable: true,
        },
        // {
        //     title: '',
        //     dataIndex: 'operation',
        //     render: (_, record) =>
        //         dataSource.length >= 1 ? (
        //             <Button onClick={() => deleteRow(record)}><DeleteOutlined /></Button>
        //         ) : null,
        // },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
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
            setStatus(false)
        })
    }, [status, tableParams.pagination.current])


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

            KMUpdateService(updatedValue).then(res => {
                if (res?.data.statusCode === 403) {
                    setErrorRows({ ...row, error: true });
                } else if (res?.data.statusCode === 202) {
                    setStatus(true)
                }
            })

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
                errorRows,
            }),
            onRow: (record) => ({
                record,
                errorRows
            })
        };
    });

    const handleOutsideClick = (e) => {
        if (!e.target.closest('.context-menu')) {
            setShowContext(false);
        }
    };

    const handleContextMenu = (event, record, rowIndex) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setSelectedRowData(record);
        setShowContext(true);
    };

    useEffect(() => {
        if (showContext) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showContext]);


    return (
        <div className="km">
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
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    onChange={handleTableChange}
                    onRow={(record, rowIndex) => {
                        return {
                            onContextMenu: e => {
                                return handleContextMenu(e, record, rowIndex)
                            }
                        }
                    }}
                />
                {showContext && <ContextMenu position={contextMenuPosition} rowData={selectedRowData} />}
            </div>
        </div>
    )
}

export default KmUpdate

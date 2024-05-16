import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { HomeOutlined } from "@ant-design/icons"
import Filter from "./filter/Filter";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DatePicker, Form, Input, message, Space, Table } from 'antd';
import { useForm } from "react-hook-form";
import ContextMenu from "./context-menu/ContextMenu";
import { KMAddService, KMGetService, KMValidateService } from "../../../api/service";
import dayjs from "dayjs";
import { formatDate, formatTime } from "../../../utils/format";

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
const EditableRow = ({ ...props }) => {
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
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    errorRows,
    validatedRows,
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
            [dataIndex]: dataIndex === "kmLogtarih" ? record[dataIndex].split("T")[0] : record[dataIndex],
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
                style={{ margin: 0 }}
                name={dataIndex}
            // rules={[
            //     { required: true, message: `${title} is required.` }
            // ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    let error
    let valid
    if (errorRows?.length > 0) {
        error = errorRows.some(row => row.kmAracId === record.aracId && row.error) ? 'error-text' : ''
    }

    if (validatedRows?.length > 0) {
        valid = validatedRows.some(row => row.kmAracId === record.aracId) ? 'success-text' : ''
    }

    return <td {...restProps} className={`${error} ${valid}`}>{childNode}</td>;
};

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
        dataIndex: 'guncelKm',
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
    },
    {
        title: 'Saat',
        dataIndex: 'saat',
        editable: true,
    },
];

const KmUpdate = () => {
    const [dataSource, setDataSource] = useState([
        // {
        //     key: '1',
        //     plaka: "38 ABT 114",
        //     aracTip: "Dorse",
        //     marka: "Binek",
        //     lokasyon: "Bursa",
        //     departman: "Merkez",
        //     eskiKm: 234,
        //     guncelKm: 200,
        //     kmLogtarih: "2024-01-01",
        //     kmLogSaat: "18:00:00"
        // },
        // {
        //     key: '2',
        //     plaka: "38 ABT 114",
        //     aracTip: "Dorse",
        //     marka: "Binek",
        //     lokasyon: "Bursa",
        //     departman: "Merkez",
        //     guncelKm: 234,
        //     kmLogtarih: "2024-01-01",
        //     kmLogSaat: "15:40:00"
        // }
    ]);

    const [showContext, setShowContext] = useState(false);
    const [status, setStatus] = useState(false)
    const [errorRows, setErrorRows] = useState([]);
    const [validatedRows, setValidatedRows] = useState([]);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });


    const [date, setDate] = useState({
        tarih: dayjs(new Date()).format('DD.MM.YYYY'),
        saat: dayjs(new Date()).format('HH:mm:ss')
    })

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Hızlı Km Güncellendi!',
        });
    };

    const defaultValues = {
        kmAracId: 0,
        seferSiraNo: 0,
        yakitSiraNo: 0,
        plaka: "",
        tarih: "",
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

    const { control } = methods

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    useEffect(() => {
        KMGetService(tableParams.pagination.current).then(res => {
            const modifiedData = res?.data.km_list.map(item => ({
                ...item,
                tarih: item.tarih || date.tarih,
                saat: item.saat || date.saat,
            }));
            setDataSource(modifiedData)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
            setStatus(false)
        })
    }, [status, tableParams.pagination.current, date])

    const handleSave = async (row) => {
        try {
            const newData = [...dataSource];
            const index = newData.findIndex((item) => item.aracId === row.aracId);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setDataSource(newData);

                const body = {
                    "siraNo": 0,
                    "kmAracId": row.aracId,
                    "seferSiraNo": 0,
                    "yakitSiraNo": 0,
                    "plaka": row.plaka,
                    "tarih": row.tarih.split(".").reverse().join("-"),
                    "saat": row.saat,
                    "eskiKm": row.guncelKm,
                    "yeniKm": row.yeniKm,
                    "fark": 0,
                    "kaynak": "guncelle",
                    "dorse": true,
                    "aciklama": ""
                }

                if (body.tarih && body.saat && body.yeniKm) {
                    KMValidateService(body).then(res => {
                        if (res?.data.statusCode === 400) {
                            if (!errorRows.some(item => item.kmAracId === body.kmAracId)) {
                                setErrorRows(prevErrorRows => [...prevErrorRows, { ...body, error: true }]);
                            }

                            const filteredValidatedRows = validatedRows.filter(item => item.kmAracId !== row.aracId)
                            setValidatedRows(filteredValidatedRows);
                        }
                        else if (res?.data.statusCode === 200) {
                            const filteredErrorRows = errorRows.filter(item => item.kmAracId !== row.aracId)
                            setErrorRows(filteredErrorRows);

                            const existingIndex = validatedRows.findIndex(item => item.kmAracId === body.kmAracId);
                            if (existingIndex > -1) {
                                setValidatedRows(prevValidatedRows => {
                                    const updatedRows = [...prevValidatedRows];
                                    updatedRows[existingIndex] = { ...updatedRows[existingIndex], yeniKm: body.yeniKm, tarih: body.tarih, saat: body.saat };
                                    return updatedRows;
                                });
                            } else {
                                setValidatedRows(prevValidatedRows => [...prevValidatedRows, body]);
                            }
                        }
                    });
                } else {
                    const filteredErrorRows = errorRows.filter(item => item.kmAracId !== row.aracId)
                    setErrorRows(filteredErrorRows);
                }
            }
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
                validatedRows
            }),
        };
    });

    const handleOutsideClick = (e) => {
        if (!e.target.closest('.context-menu')) {
            setShowContext(false);
        }
    };

    const handleContextMenu = (event, record) => {
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

    const addKm = () => {
        KMAddService(validatedRows).then(res => {
            if (res?.data.statusCode === 200) {
                success()
                setStatus(true)
            }
        })
    }


    const content = (
        <Space direction="vertical">
            <DatePicker placeholder="Tarih" onChange={d => setDate({ ...date, tarih: formatDate(d?.$d) })} className="w-full" />
            <DatePicker picker="time" placeholder="Saat" onChange={t => setDate({ ...date, saat: formatTime(t?.$d) })} className="w-full" />
        </Space>
    )

    return (
        <div className="km">
            <div className='content'>
                <BreadcrumbComp items={breadcrumb} />
            </div>

            <div className="content">
                <Filter setDataSource={setDataSource} control={control} setTableParams={setTableParams} tableParams={tableParams} content={content} addKm={addKm} errorRows={errorRows} validatedRows={validatedRows} />
            </div>

            <div className="content settings">
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

                {contextHolder}

                {showContext && <ContextMenu position={contextMenuPosition} rowData={selectedRowData} />}
            </div>
        </div>
    )
}

export default KmUpdate

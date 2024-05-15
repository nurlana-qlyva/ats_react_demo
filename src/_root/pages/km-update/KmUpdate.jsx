import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { HomeOutlined, DeleteOutlined } from "@ant-design/icons"
import Filter from "./filter/Filter";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import { useForm } from "react-hook-form";
import ContextMenu from "./context-menu/ContextMenu";
import { KMAddService, KMGetService, KMValidateService } from "../../../api/service";
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
                rules={[{ required: true, message: `${title} is required.` },

                    // ({ getFieldValue }) => ({
                    //     validator(_, value) {
                    //         if (errorRows.error && dataIndex === 'guncelKm') { // Assuming 'guncelKm' is the dataIndex for the input you want to validate
                    //             return Promise.reject('Error message'); // Return a rejection to trigger the red border
                    //         }
                    //         return Promise.resolve();
                    //     },
                    // }),
                ]}
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
    let classRow
    if (!!errorRows) {
        classRow = errorRows.some(row => row.aracId === record.aracId && row.error) ? 'red-text' : ''
    }

    return <td {...restProps} className={classRow}>{childNode}</td>;
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
        render: (text) => dayjs(text).locale('tr').format('DD MMMM YYYY'),
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
    const [editedRows, setEditedRows] = useState({});

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

    const { control, handleSubmit, reset, setValue } = methods

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
                tarih: item.tarih || dayjs(new Date()).format('YYYY-MM-DD'),
                saat: item.saat || '00:00:00',
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
    }, [status, tableParams.pagination.current])

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
                    "tarih": row.tarih,
                    "saat": row.saat,
                    "eskiKm": row.guncelKm,
                    "yeniKm": row.yeniKm,
                    "fark": 0,
                    "kaynak": "guncelle",
                    "dorse": true,
                    "aciklama": ""
                }

                KMValidateService(body).then(res => {
                    if (res?.data.statusCode === 400) {
                        if (!errorRows.some(item => item.aracId === row.aracId && item.error)) {
                            setErrorRows(prevErrorRows => [...prevErrorRows, { ...row, error: true }]);
                        }
                    } else if (res?.data.statusCode === 200) {
                        setErrorRows(prevErrorRows => prevErrorRows.map(item =>
                            item.aracId === row.aracId ? { ...item, error: false } : item
                        ));
                        if (!validatedRows.some(item => item.aracId === row.aracId)) {
                            setValidatedRows(prevErrorRows => [...prevErrorRows, {
                                "siraNo": 0,
                                "kmAracId": row.aracId,
                                "seferSiraNo": 0,
                                "yakitSiraNo": 0,
                                "plaka": row.plaka,
                                "tarih": row.tarih,
                                "saat": row.saat,
                                "eskiKm": row.guncelKm,
                                "yeniKm": row.yeniKm,
                                "fark": 0,
                                "kaynak": "guncelle",
                                "dorse": true,
                                "aciklama": ""
                            }]);
                        }
                    }
                });
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
                errorRows
            }),
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

    const addKm = () => {
        console.log(validatedRows)
        KMAddService(validatedRows).then(res => console.log(res.data))

    }

    // useEffect(() => {
    //     const includesCommonItem = dataSource.some(item1 =>
    //         errorRows.some(item2 => item1.aracId === item2.aracId)
    //     );
    // }, [dataSource, errorRows])


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
                <div className="flex justify-end mt-10">
                    <Button className="primary-btn" onClick={addKm}>Güncelle</Button>
                </div>

                {showContext && <ContextMenu position={contextMenuPosition} rowData={selectedRowData} />}
            </div>
        </div>
    )
}

export default KmUpdate

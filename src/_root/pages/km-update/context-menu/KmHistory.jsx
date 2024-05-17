import { Form, Input, Table } from "antd"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { KMLogListGetByIdService, KMLogListGetService } from "../../../../api/service";

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
    handleRemoveValidatedRow,
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

    const clearInput = () => {
        form.setFieldsValue({ [dataIndex]: '' });
        handleRemoveValidatedRow(record.aracId);
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
            >
                <Input ref={inputRef} allowClear onPressEnter={save} onBlur={save} onChange={(e) => {
                    if (e.target.value === '') {
                        clearInput();
                    }
                }} />
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

    return <td {...restProps}>{childNode}</td>;
};

const defaultColumns = [
    {
        title: 'Plaka',
        dataIndex: 'plaka',
    },
    {
        title: 'Lokasyon',
        dataIndex: 'lokasyon',
    },
    {
        title: 'Kaynak',
        dataIndex: 'kaynak',
    },
    {
        title: 'Eski km',
        dataIndex: 'eskiKm',
    },
    {
        title: 'Yeni km',
        dataIndex: 'yeniKm',
    },
    {
        title: 'Fark km',
        dataIndex: 'farkKm',
    },
    {
        title: 'Tarih',
        dataIndex: 'tarih',
    },
    {
        title: 'Saat',
        dataIndex: 'saat',
    },
];

const KmUpdate = ({ data }) => {
    const [dataSource, setDataSource] = useState([]);
    const [showContext, setShowContext] = useState(false);
    const [status, setStatus] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        KMLogListGetByIdService(data.aracId, tableParams.pagination.current).then(res => {
            console.log(res.data)
            setDataSource(res?.data.km_list)
            // setTableParams({
            //     ...tableParams,
            //     pagination: {
            //         ...tableParams.pagination,
            //         total: res?.data.total_count,
            //     },
            // });
        })
    }, [data, tableParams.pagination])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };


    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
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
            }),
        };
    });

    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                pagination={tableParams.pagination}
                dataSource={dataSource}
                columns={columns}
                size="small"
                onChange={handleTableChange}
            />
        </div>
    )
}

export default KmUpdate

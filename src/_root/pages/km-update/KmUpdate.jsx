import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { HomeOutlined } from "@ant-design/icons"
import Filter from "./filter/Filter";
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, Table } from 'antd';
import { useForm } from "react-hook-form";
import ContextMenu from "./context-menu/ContextMenu";

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
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    const showContextMenu = (e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
    };

    const hideContextMenu = () => {
        setMenuVisible(false);
    };

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
    return <td {...restProps} onContextMenu={showContextMenu}>
        <div onMouseLeave={hideContextMenu}>{childNode}</div>
        <ContextMenu visible={menuVisible} x={menuPosition.x} y={menuPosition.y} />
    </td>

};

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        title: 'Hızlı Km Güncelleme',
    },
]

const KmUpdate = () => {
    const [dataSource, setDataSource] = useState([]);
    const [hasValue, setHasValue] = useState(false);

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

    const defaultColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            editable: true,
        },
        {
            title: 'Araç Tipi',
            dataIndex: 'aracTip',
            editable: true,
        },
        {
            title: 'Marka',
            dataIndex: 'marka',
            editable: true,
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
            editable: true,
        },
        {
            title: 'Departman',
            dataIndex: 'departman',
            editable: true,
        },
        {
            title: 'Güncel km',
            dataIndex: 'guncelKm',
            editable: true,
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
        }
    ];

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const handleSearchFilters = handleSubmit((values) => {
        if (!values.aracId && !values.aracTip && !values.model && !values.marka && !values.plaka && !values.yakitTip && !values.grup && !values.renk && !values.yil) {
            setHasValue(false)
        } else {
            setHasValue(true)
        }
    })

    const clear = () => {
        reset();
        setHasValue(false)
    }

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
                <Filter control={control} setValue={setValue} handleSearchFilters={handleSearchFilters} clear={clear} hasValue={hasValue} />
            </div>

            <div className="content">
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    // bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        </>
    )
}

export default KmUpdate

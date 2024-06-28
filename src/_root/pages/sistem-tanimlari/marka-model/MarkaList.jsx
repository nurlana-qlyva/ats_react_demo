import { useEffect, useState } from 'react'
import { Layout, Menu, List, Button } from 'antd';
import { GetMarkaListService, GetModelListByMarkaService } from '../../../../api/services/markamodel_services';
import AddModal from './marka-modals/AddModal';
import UpdateModalModal from './marka-modals/UpdateModal';
import AddModelModal from './model-modals/AddModelModal';
import UpdateModelModal from './model-modals/UpdateModelModal';

const { Sider, Content } = Layout;

const MarkaList = () => {
    const [selectedMarka, setSelectedMarka] = useState(null);
    const [markaList, setMarkaList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [marka, setMarka] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isModelAddOpen, setIsModelAddOpen] = useState(false)
    const [isModelUpdateOpen, setIsUpdateModelOpen] = useState(false)
    const [status, setStatus] = useState(false)
    const [statusModel, setStatusModel] = useState(false)
    const [selectedModel, setSelectedModel] = useState(null);

    useEffect(() => {
        GetMarkaListService().then(res => setMarkaList(res.data))
    }, [status])

    useEffect(() => {
        GetModelListByMarkaService(selectedMarka).then(res => setModelList(res.data))
    }, [selectedMarka, statusModel])

    const handleMarkaClick = (id) => {
        setSelectedMarka(id);
        const label = markaList.find(item => item.siraNo === +id)
        setMarka(label.marka)
        setSelectedModel(null);
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
    };

    const updatedList = markaList.map(item => {
        return {
            key: item.siraNo,
            label: item.marka,
        }
    })
    console.log(selectedModel)
    return (
        <div className="sistem">
            <Layout style={{ height: '90vh' }}>
                <Sider width={200} style={{ background: "#fff", height: '100%' }}>
                    <div style={{ height: '32px', background: '#fff', textAlign: 'center', lineHeight: '32px' }}>Marka</div>
                    <Menu
                        mode="inline"
                        style={{ height: '70%', borderRight: 0, overflow: "auto" }}
                        onClick={({ key }) => handleMarkaClick(key)}
                        items={updatedList}
                    />
                    <div style={{ textAlign: 'center' }} className='mt-20'>
                        <Button onClick={() => setIsOpen(true)}>Add</Button>
                        <Button onClick={() => setIsUpdateOpen(true)}>Edit</Button>
                        <Button onClick={() => console.log("Delete logic")}>Delete</Button>
                    </div>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content style={{ padding: 24, margin: 0, minHeight: 280, overflow: 'auto' }}>
                        {selectedMarka && (
                            <>
                                <div style={{ marginBottom: '16px', textAlign: 'center' }}>{marka}</div>
                                <List
                                    dataSource={modelList}
                                    renderItem={(model) => (
                                        <List.Item
                                            onClick={() => handleModelClick(model)}
                                            style={{ backgroundColor: selectedModel && selectedModel.siraNo === model.siraNo ? '#e6f7ff' : '#fff' }}
                                        >
                                            {model.modelDef}
                                        </List.Item>
                                    )}
                                    style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}
                                />
                            </>
                        )}
                    </Content>
                    <Content style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Button onClick={() => setIsModelAddOpen(true)} style={{ marginRight: '8px' }}>Add</Button>
                        <Button onClick={() => setIsUpdateModelOpen(true)} style={{ marginRight: '8px' }}>Edit</Button>
                        <Button onClick={() => console.log("Delete logic")}>Delete</Button>
                    </Content>
                </Layout>
            </Layout>

            <AddModal isOpen={isOpen} setIsOpen={setIsOpen} setStatus={setStatus} />
            <UpdateModalModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} setStatus={setStatus} markaItem={{ siraNo: selectedMarka, marka: marka }} />

            <AddModelModal isOpen={isModelAddOpen} setIsOpen={setIsModelAddOpen} setStatus={setStatusModel} markaId={selectedMarka} />
            <UpdateModelModal isOpen={isModelUpdateOpen} setIsOpen={setIsUpdateModelOpen} setStatus={setStatusModel} modelItem={selectedModel} />
        </div>

    );
};


export default MarkaList

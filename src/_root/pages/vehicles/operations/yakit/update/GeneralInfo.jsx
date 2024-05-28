import { Tabs } from 'antd'
import GeneralInfoTab from './tabs/GeneralInfo'
import OtherInfoTab from './tabs/OtherInfoTab'

const GeneralInfo = () => {

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfoTab />,
        },
        {
            key: '2',
            label: 'Diğer Bilgiler',
            children: <OtherInfoTab />
        }
    ]

    return (
        <div className='inner-tab p-20'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default GeneralInfo

import { t } from 'i18next'
import { HomeOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'
import FirmaSettings from './tabs/firma/FirmaSettings'
import HatirlaticiSettings from './tabs/hatirlatici/HatirlaticiSettings'

const breadcrumb = [
  {
    href: '/',
    title: <HomeOutlined />,
  },
  {
    title: t("ayarlar"),
  },
]

const Settings = () => {
  const items = [
    {
      key: 1,
      label: t("firmaBilgileri"),
      children: <FirmaSettings />
    },
    {
      key: 2,
      label: t("hatirlaticiAyarlari"),
      children: <HatirlaticiSettings />
    },
    {
      key: 3,
      label: t("araclar"),
      children: 'content1'
    },
    {
      key: 4,
      label: t("stokIslemleri"),
      children: 'content1'
    },
    {
      key: 5,
      label: t("otomatikKodlar"),
      children: 'content1'
    },
    {
      key: 6,
      label: t("yakitIslemleri"),
      children: 'content1'
    },
  ]

  return (
    <div>
      <div className='content'>
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <div className="content settings">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={items}
        />
      </div>
    </div>
  )
}

export default Settings

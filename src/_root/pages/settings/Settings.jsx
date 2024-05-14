import { HomeOutlined } from "@ant-design/icons"
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb"
import { Tabs } from "antd"
import FirmaInfo from "./components/FirmaInfo"

const breadcrumb = [
  {
    href: '/',
    title: <HomeOutlined />,
  },
  {
    title: 'Ayarlar',
  },
]



const Settings = () => {
  const items = [
    {
      key: 1,
      label: 'Firma Bilgileri',
      children: <FirmaInfo />
    },
    {
      key: 2,
      label: 'Hatırlatıcı Ayarları',
      children: 'content2'
    },
    {
      key: 3,
      label: 'Araçlar',
      children: 'content1'
    },
    {
      key: 4,
      label: 'Stok İşlemleri',
      children: 'content1'
    },
    {
      key: 5,
      label: 'Otomatik Kodlar',
      children: 'content1'
    },
    {
      key: 6,
      label: 'Program Kısayol Tuşları',
      children: 'content1'
    },
    {
      key: 7,
      label: 'Yedekleme',
      children: 'content1'
    },
    {
      key: 8,
      label: 'Sefer Hareketleri',
      children: 'content1'
    },
    {
      key: 9,
      label: 'Lastik Bilgileri',
      children: 'content1'
    },
    {
      key: 10,
      label: 'Yakıt İşlemleri',
      children: 'content1'
    },
    {
      key: 11,
      label: 'Özel Menü',
      children: 'content1'
    },
    {
      key: 12,
      label: 'Lisans Bilgileri',
      children: 'content1'
    },
    {
      key: 13,
      label: 'Belge Yönetimi',
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

import { HomeOutlined } from "@ant-design/icons"
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb"

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
  return (
    <div>
      <div className='content'>
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <div className="content"></div>
    </div>
  )
}

export default Settings

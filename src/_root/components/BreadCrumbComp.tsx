import { BreadCrumb } from 'primereact/breadcrumb';
import { IoMdHome } from "react-icons/io";

const BreadCrumbComp = ({items}) => {
    const home: MenuItem = { icon: 'pi pi-home', url: '/dashboard' }

    return (
        <BreadCrumb model={items} home={home} className='breadcrumb' />
    )
}

export default BreadCrumbComp

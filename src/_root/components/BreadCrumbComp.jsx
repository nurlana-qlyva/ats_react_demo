import { BreadCrumb } from 'primereact/breadcrumb';

const BreadCrumbComp = ({ items }) => {
    const home = { icon: 'pi pi-home', url: '/dashboard' };

    return (
        <BreadCrumb model={items} home={home} className='breadcrumb' />
    );
}

export default BreadCrumbComp;

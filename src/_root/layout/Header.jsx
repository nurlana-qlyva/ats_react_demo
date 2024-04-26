// components 
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';

 
const Header = () => {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link gap-3">
            <span className={item.icon} style={{marginRight: 10}}/>
            <span className="mx-2">{item.label}</span>
        </a>
    );
    
    const items = [
        {
            label: '',
            icon: "pi pi-home"
        },
        {
            label: 'Projects',
            icon: "pi pi-search",
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    template: itemRenderer
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
    ];

    const end = (
        <div className="flex align-items-center gap-3">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto search-input" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className='header'>
            <Menubar model={items} end={end} className='w-full justify-content-between' />
        </div>
    )
}

export default Header

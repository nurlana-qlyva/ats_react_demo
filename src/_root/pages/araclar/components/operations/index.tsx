import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { TieredMenu } from 'primereact/tieredmenu';
import { MenuItem } from 'primereact/menuitem';
import { Dialog } from 'primereact/dialog';
import BakimModal from './components/bakim';

export default function Operations() {
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const menu = useRef(null);
    const items: MenuItem[] = [
        {
            label: 'Bakımlar',
            icon: 'pi pi-file',
            command: () => handleItemClick('Bakımlar')
        },
        {
            separator: true
        },
        {
            label: 'Yakıtlar',
            icon: 'pi pi-file-edit',
            command: () => handleItemClick('Yakıtlar')

        },
        {
            separator: true
        },
        {
            label: 'Görevler',
            icon: 'pi pi-search'
        },
        {
            separator: true
        },
        {
            label: 'Harcamalar',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Kazalar',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Cezalar',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Sigortalar',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Lastikler',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'KM Takibi',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Parçalar',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Gelirler',
            icon: 'pi pi-share-alt',
        },
        {
            separator: true
        },
        {
            label: 'Analiz',
            icon: 'pi pi-share-alt',
        }
    ];

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
        setVisible(true);
    };

    const renderModalContent = () => {
        switch (selectedItem) {
            case 'Bakımlar':
                return <BakimModal visible={visible} setVisible={setVisible} />;
            case 'Yakıtlar':
                return ;
            default:
                return null;
        }
    };

    return (
        <div className="card flex justify-content-center">
            <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
            <Button label="İşlemler" icon="pi pi-angle-down" className='islem-btn' onClick={(e) => menu.current.toggle(e)} />
            {renderModalContent()}
        </div>
    );
}

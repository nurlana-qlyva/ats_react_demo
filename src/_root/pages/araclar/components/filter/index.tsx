import { useState } from "react"
// components
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const FilterRows = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [visibleFilter, setVisibleFilter] = useState<boolean>(false)

    const handleAddFilter = () => {
        setVisibleFilter(true)
    }

    const customHeader = (
        <div className="flex align-items-center justify-content-between gap-2" style={{ width: "80%" }}>
            <p>
                <span className="pi pi-filter mr-2" ></span>
                Fİltreler
            </p>
            <Button className="filtre-btn" label="Uygula" onClick={() => setVisible(true)} />
        </div>
    );

    const filterTemplate = (
        <div className="border-1 border-300 mb-3 p-3">
            <Dropdown  className="w-full mb-2"/>
            <InputText />
        </div>
    )

    return (
        <>
            <Button className="filtre-btn" label="Filtreler" icon="pi pi-filter" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} header={customHeader} position="right" onHide={() => setVisible(false)} closeIcon={false} style={{ width: "28rem" }}>
                {
                    visibleFilter && filterTemplate
                }
                <Button className="filtre-ekle-btn w-full " label="Filtre ekle" icon="pi pi-plus" onClick={handleAddFilter} />
            </Sidebar>
        </>
    )
}

export default FilterRows

import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";


const columns = [
    { code: "aracId", name: "ARAÇ ID" },
    { code: "plaka", name: "ARAÇ PLAKA" },
    { code: "aracTip", name: "ARAÇ TİP" },
    { code: "marka", name: "MARKA" },
    { code: "model", name: "MODEL" },
    { code: "grup", name: "GRUP" },
    { code: "renk", name: "RENK" },
    { code: "yil", name: "ÜRETİM YILI" },
    { code: "yakitTip", name: "YAKIT TİPİ" },
];

const FilterRows = ({ handleSearchForFilters }) => {
    const [visible, setVisible] = useState(false);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [inputValues, setInputValues] = useState([]);
    const [data, setData] = useState({
        aracId: 0,
        plaka: "",
        aracTip: "",
        renk: "",
        grup: "",
        model: "",
        marka: "",
        yakitTip: "",
        yil: 0,
    });

    const handleAddFilter = () => {
        if (selectedFilter) {
            setFilters((prevFilters) => [...prevFilters, selectedFilter]);
            setSelectedFilter(null);
            setInputValues((prevInputValues) => [...prevInputValues, ""]);
        }
    };

    const handleSelectedFilters = () => {
        const updatedData = { ...data };
        filters.forEach((filter, index) => {
            updatedData[filter.code] = inputValues[index];
        });
        setData(updatedData);
        handleSearchForFilters(updatedData)
        setVisible(false)
    };

    const removeFilter = (index) => {
        setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
        setInputValues((prevInputValues) => prevInputValues.filter((_, i) => i !== index));
    };

    const filterTemplates = filters.map((filter, index) => (
        <div key={index} className="border-1 border-300 mb-3 p-3">
            <Dropdown
                value={filter}
                onChange={(e) => {
                    const updatedFilters = [...filters];
                    updatedFilters[index] = e.value;
                    setFilters(updatedFilters);
                }}
                options={columns}
                optionLabel="name"
                placeholder="Select a Column"
                filter
                className="w-full"
            />
            <InputText
                value={inputValues[index]}
                onChange={(e) => {
                    const updatedInputValues = [...inputValues];
                    updatedInputValues[index] = e.target.value;
                    setInputValues(updatedInputValues);
                }}
                className="my-2"
            />
            <Button
                className="filtre-sil-btn"
                label="Filtreyi Sil"
                icon="pi pi-times"
                onClick={() => removeFilter(index)}
            />
        </div>
    ));

    const customHeader = (
        <div className="flex align-items-center justify-content-between gap-2" style={{ width: "80%" }}>
            <p>
                <span className="pi pi-filter mr-2"></span>
                Fİltreler
            </p>
            <Button className="filtre-btn" label="Uygula" onClick={handleSelectedFilters} />
        </div>
    );

    return (
        <>
            <Button className="filtre-btn" label="Filtreler" icon="pi pi-filter" onClick={() => setVisible(true)} />
            <Sidebar
                visible={visible}
                header={customHeader}
                position="right"
                onHide={() => setVisible(false)}
                closeIcon={false}
                style={{ width: "28rem" }}
            >
                {filterTemplates}
                <Dropdown
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.value)}
                    options={columns}
                    optionLabel="name"
                    placeholder="Select a Column"
                    filter
                    className="w-full mb-2"
                />
                <Button className="filtre-ekle-btn w-full" label="Filtre ekle" icon="pi pi-plus" onClick={handleAddFilter} />
            </Sidebar>
        </>
    );
};

export default FilterRows;

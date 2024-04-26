import React, { useState } from 'react';

const data = [
    {
        "lokasyonId": 1,
        "anaLokasyonId": 0,
        "lokasyonTipId": -1,
        "lokasyonDegistirenId": -1,
        "lokasyonOlusturanId": -1,
        "lokasyonAciklama": "",
        "lokasyonTanim": "BURSA",
        "lokasyonTumYol": "BURSA",
        "lokasyonAktif": true,
        "lokasyonOlusturmaTarih": null,
        "lokasyonDegistirmeTarih": null
    },
    {
        "lokasyonId": 2,
        "anaLokasyonId": 1,
        "lokasyonTipId": -1,
        "lokasyonDegistirenId": -1,
        "lokasyonOlusturanId": -1,
        "lokasyonAciklama": "",
        "lokasyonTanim": "OSMANGAZİ",
        "lokasyonTumYol": "BURSA/OSMANGAZİ",
        "lokasyonAktif": true,
        "lokasyonOlusturmaTarih": null,
        "lokasyonDegistirmeTarih": null
    },
    {
        "lokasyonId": 3,
        "anaLokasyonId": 0,
        "lokasyonTipId": -1,
        "lokasyonDegistirenId": -1,
        "lokasyonOlusturanId": -1,
        "lokasyonAciklama": "",
        "lokasyonTanim": "İSTANBUL",
        "lokasyonTumYol": "İSTANBUL",
        "lokasyonAktif": true,
        "lokasyonOlusturmaTarih": null,
        "lokasyonDegistirmeTarih": null
    },
    {
        "lokasyonId": 4,
        "anaLokasyonId": 3,
        "lokasyonTipId": -1,
        "lokasyonDegistirenId": -1,
        "lokasyonOlusturanId": -1,
        "lokasyonAciklama": "",
        "lokasyonTanim": "ÜSKÜDAR",
        "lokasyonTumYol": "İSTANBUL/ÜSKÜDAR",
        "lokasyonAktif": true,
        "lokasyonOlusturmaTarih": null,
        "lokasyonDegistirmeTarih": null
    },
    {
        "lokasyonId": 5,
        "anaLokasyonId": 4,
        "lokasyonTipId": -1,
        "lokasyonDegistirenId": -1,
        "lokasyonOlusturanId": -1,
        "lokasyonAciklama": "",
        "lokasyonTanim": "ÜSKÜDAR MEYDAN",
        "lokasyonTumYol": "İSTANBUL/ÜSKÜDAR/ÜSKÜDAR MEYDAN",
        "lokasyonAktif": true,
        "lokasyonOlusturmaTarih": null,
        "lokasyonDegistirmeTarih": null
    }
]

const convertToTreeFormat = (inputData) => {
    const map = {};
    const result = [];

    inputData.forEach((item) => {
        map[item.lokasyonId] = { ...item, children: [] };
    });

    inputData.forEach((item) => {
        if (item.anaLokasyonId !== 0) {
            map[item.anaLokasyonId].children.push(map[item.lokasyonId]);
        } else {
            result.push(map[item.lokasyonId]);
        }
    });
    return result;
};

const CustomTreeTable = () => {
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id],
        });
    };

    const renderRows = (nodes, level = 0) => {
        return nodes.map((node) => (
            <React.Fragment key={node.id}>
                <tr>
                    <td style={{ paddingLeft: level * 20 }}>
                        {node.children && (
                            <button onClick={() => toggleRow(node.id)}>
                                {expandedRows[node.id] ? '-' : '+'}
                            </button>
                        )}
                        {node.lokasyonTanim}
                    </td>
                    <td>{node.description}</td>
                    <td>{node.value}</td>
                </tr>
                {expandedRows[node.id] && node.children && (
                    <React.Fragment>{renderRows(node.children, level + 1)}</React.Fragment>
                )}
            </React.Fragment>
        ));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>{renderRows(convertToTreeFormat(data))}</tbody>
        </table>
    );
};

export default CustomTreeTable;

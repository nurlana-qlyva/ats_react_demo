import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const PlakaContext = createContext();

export const PlakaProvider = ({ children }) => {
    const [plaka, setPlaka] = useState([]);
    const [data, setData] = useState([]);
    const [history, setHistory] = useState(false);

    const values = { plaka, setPlaka, data, setData, setHistory, history };

    return (
        <PlakaContext.Provider value={values}>
            {children}
        </PlakaContext.Provider>
    );
};

PlakaProvider.propTypes = {
    children: PropTypes.node,
};

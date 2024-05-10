import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const LineChartComp = () => {
    return (
        <>
            <h2>Line Chart</h2>
            <LineChart
                width={500}
                style={{ width: "100%" }}
                height={300}
                data={data}
                margin={{
                    top: 0,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#fff" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend color='#fff' />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={4} strokeDasharray={5} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </>
    )
}

export default LineChartComp

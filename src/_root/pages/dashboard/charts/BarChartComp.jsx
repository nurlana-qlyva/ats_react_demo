import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

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

const BarChartCOmp = () => {
    return (
        <>
            <h2>Bar Chart</h2>
            <BarChart
                width={500}
                height={300}
                style={{ width: "100%" }}
                data={data}
                margin={{
                    top: 0,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                animationBegin={0}
                animationDuration={1500}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#333" tick={{ fontSize: 12 }} tickLine={false} />
                <YAxis stroke="#333" tick={{ fontSize: 12 }} tickLine={false} />
                <Tooltip />
                <Legend align="center" height={36} />
                <Bar dataKey="pv" fill="#FF5733" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" fill="#3498DB" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </>
    )
}

export default BarChartCOmp

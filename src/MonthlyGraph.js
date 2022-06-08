import React, { useState, useEffect }  from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function MonthlyGraph(props) {
    const [graphData, setGraphData] = useState([]);
    useEffect(() => {
        console.log(props)
        let parsedData = {}
        for (let data of props.data) {
            if (data['category'] in parsedData) {
                if (data['instrument'] in parsedData[data['category']]) {
                    parsedData[data['category']][data['instrument']] += data['price']
                }
                else {
                    parsedData[data['category']][data['instrument']] = data['price']
                }
            }
            else {
                let instrument = data['instrument']
                parsedData[data['category']] = {[instrument]: data['price']}
            }
        }

        let graphData = []
        for(let category in parsedData) {
            graphData.push({
                'name': category,
                'shinhan': parsedData[category]['shinhan'] ? parsedData[category]['shinhan'] : 0,
                'woori': parsedData[category]['woori'] ? parsedData[category]['woori'] : 0,
                'hyundai': parsedData[category]['hyundai'] ? parsedData[category]['hyundai'] : 0,
            })
        }
        console.log(graphData)
        setGraphData(graphData.reverse())

    }, [props])

    return (
        <BarChart
            width={1100}
            height={250}
            data={graphData}
            margin={{
                top: 0,
                right: 100,
                left: 60,
                bottom: 5,
            }}
            padding={{
                right: 30
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="woori" stackId="a" fill="#ffecb8" /> */}
            <Bar dataKey="woori" stackId="a" fill="#2185d0" />
            {/* <Bar dataKey="hyundai" stackId="a" fill="#b7ded2" /> */}
            <Bar dataKey="hyundai" stackId="a" fill="#21ba45" />
            {/* <Bar dataKey="shinhan" stackId="a" fill="#bbbbbb" /> */}
            <Bar dataKey="shinhan" stackId="a" fill="#767676" />
      </BarChart>
    );
}

export default MonthlyGraph


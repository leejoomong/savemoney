import React, { useState, useEffect }  from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function CardGraph(props) {
    const [graphData, setGraphData] = useState([]);
    const [months, setMonths] = useState([]);
    useEffect(() => {
        console.log(props)
        let parsedData = {}
        let months = []
        for (let data of props.data) {
            if (months.indexOf(data['month']) < 0) {
                months.push(data['month'])
            }
            if (data['category'] in parsedData) {
                if (data['month'] in parsedData[data['category']]) {
                    parsedData[data['category']][data['month']] += data['price']
                }
                else {
                    parsedData[data['category']][data['month']] = data['price']
                }
            }
            else {
                let month = data['month']
                parsedData[data['category']] = {[month]: data['price']}
            }
        }
        setMonths(months)

        let graphData = []
        console.log(months)
        for(let category in parsedData) {
            let categoryData = {'name': category}
            for (let month of months) {
                console.log(month)
                categoryData[month] = parsedData[category][month] ? parsedData[category][month] : 0
            }
            graphData.push(categoryData)
        }
        console.log(graphData)
        setGraphData(graphData.reverse())

    }, [props])

    let lineGraphs = (data) => {
        let lines = data.map((month) => {
            let color = "#";
            for (let i = 0; i < 3; i++)
                color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
            return (
                <Line type="monotone" dataKey={month} stroke={color}/>
            )
        })
        return lines
    }

    return (
        <LineChart
          width={1100}
          height={250}
          data={graphData}
          margin={{
            top: 0,
            right: 100,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {lineGraphs(months)}
        </LineChart>
    );
}

export default CardGraph


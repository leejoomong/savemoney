import React, { useState, useEffect }  from 'react'
import { Dropdown } from 'semantic-ui-react'

import MonthlyTable from './MonthlyTable'
import MonthlyGraph from './MonthlyGraph'
import axios from 'axios';

function Monthly() {
    const [data, setData] = useState([]);
    const [monthOptions, setMonthOptions] = useState([]);

    const fetchExpense = async () => {
        try {
          const response = await axios.get(
            '/expenses'
          );
          setData(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          console.log(e);
        }
      };

    useEffect(() => {
        fetchExpense();
      }, []);

      useEffect(() => {
        let monthOptions = []
        let months = ([...new Set(data.map(data => data.month))])
        months.forEach(month => {
            monthOptions.push({
                key: month,
                text: month,
                value: month
            })
        });

        setMonthOptions(monthOptions);
        setMonth(months[months.length-1])
    }, [data])
    
    const yearOptions = [
        {key: '2021', text: '2021', value: '2021'},
        {key: '2022', text: '2022', value: '2022'}
    ]

    const [year, setYear] = useState('2022')
    const [month, setMonth] = useState(1)
    // const [instruments, setInstruments] = useState([])

    // useEffect(() => {
    //     setInstruments([...new Set(data.map(data => data.instrument))])
    // }, [data])

    let handleYearChange = (e, { value }) => {
        setYear(value)
    }

    let handleMonthChange = (e, { value }) => {
        setMonth(value)
    }

    return (
        <>
            <Dropdown selection options={yearOptions} value={year} onChange={handleYearChange} />{' '}
            <Dropdown selection options={monthOptions} value={month} onChange={handleMonthChange}/>
            <br /><br />
            <MonthlyGraph data={data.filter(expense => expense.month === month)}/>
            <MonthlyTable data={data.filter(expense => expense.month === month)}/>
        </>
    )
}

export default Monthly
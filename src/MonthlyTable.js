import React, { useState, useEffect }  from 'react'
import { Table, Header } from 'semantic-ui-react'

import expenseData  from './ExpenseData';
import CategoryLabel from './CategoryLabel';
import AddComma from './AddComma';

function MonthlyTable(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        setCategories([...new Set(expenseData.map(data => data.category))].reverse())
    }, [])

    let tableHeader = () => {
        let headerCells = categories.map((category) => {
            return (
                <Table.HeaderCell singleLine>{category}</Table.HeaderCell>
            )
        })
        return (
            <Table.Header>
                <Table.Row textAlign='center'>
                    <Table.HeaderCell />
                    {headerCells}
                    <Table.HeaderCell><b>합</b></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }
    
    let tableBody = (data) => {
        let tableData = {}
        let footerData = {}
        // let totalPrice = 0

        data.forEach((record) => {
            // totalPrice += record.price
            if (record.instrument in tableData) {
                if (record.category in tableData[record.instrument]) {
                    tableData[record.instrument][record.category] = tableData[record.instrument][record.category] + record.price
                }
                else {
                    tableData[record.instrument][record.category] = record.price
                }
            }
            else {
                tableData[record.instrument] = {[record['category']]: record.price}
            }
            
        })

        console.log(tableData)

        let cells = (data) => {
            let cellsOfCategory = categories.map((category) => {
                return (
                    <Table.Cell>
                        {data[category]? AddComma(data[category]) : 0}
                    </Table.Cell>
                )
            })
        return (
            <>
            {cellsOfCategory}
            </>
        )}

        let rows = Object.keys(tableData).map((card) => {
            const sumValues = Object.values(tableData[card]).reduce((a, b) => a + b)

            categories.forEach((category) => {
                if (category in footerData) {
                    footerData[category] += tableData[card][category]
                }
                else {
                    footerData[category] = tableData[card][category]
                }
            })

            return (
                <Table.Row textAlign='center'>
                    <Table.Cell>{CategoryLabel(card)}</Table.Cell>
                    {cells(tableData[card])}
                    <Table.Cell>
                        <b>{AddComma(sumValues)}</b>
                    </Table.Cell>
                </Table.Row>
            )
        })

        
        return(
            <Table.Body>
                {rows}
            </Table.Body>
        )
    }
    let footerCells = (data) => {
        let totalPrice = data.reduce((n, {price}) => n + price, 0)
        let cellOfSum = categories.map((category) => {
            let dataOfEachCategory = data.filter(data => data.category === category)

            return (
                <Table.HeaderCell>
                    <b>{AddComma(dataOfEachCategory.reduce((n, {price}) => n + price, 0))}</b>
                </Table.HeaderCell>
            )
        })
        return (
            <>
                <Table.HeaderCell>
                    <b>합</b>
                </Table.HeaderCell>
                {cellOfSum}
                <Table.HeaderCell>
                    <Header>{AddComma(totalPrice)}</Header>
                </Table.HeaderCell>
            </>
        )
    }

    return (
        <Table className='expense-table' basic='very' >
            {tableHeader()}
            {tableBody(props.data)}
            <Table.Footer>
                <Table.Row textAlign='center'>
                    {footerCells(props.data)}
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default MonthlyTable
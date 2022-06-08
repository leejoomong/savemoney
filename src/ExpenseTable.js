import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

import ExpenseAppend from './ExpenseAppend';
import CategoryLabel from './CategoryLabel';
import AddComma from './AddComma';

import axios from 'axios';

function ExpenseTable() {
    const [data, setData] = useState([])

    const fetchExpense = async () => {
        try {
          const response = await axios.get(
            '/expenses'
          );
          setData(response.data.reverse()); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          console.log(e);
        }
      };

    useEffect(() => {
        fetchExpense();
      }, []);

    let tableBody = (data) => {
        let rows = data.map((row) => {
            return (
                <Table.Row key={row.uuid} textAlign='center'>
                    <Table.Cell>
                        {row.month}
                    </Table.Cell>
                    <Table.Cell>
                        {row.date}
                    </Table.Cell>
                    <Table.Cell>
                        {row.category}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {row.title}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {AddComma(row.price)}
                    </Table.Cell>
                    <Table.Cell>
                        {CategoryLabel(row.instrument)}
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
    return (
        <>
            <ExpenseAppend data={data} fetchExpense={fetchExpense} />
            <Table className='expense-table' compact='very'>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell singleLine>월</Table.HeaderCell>
                        <Table.HeaderCell>일</Table.HeaderCell>
                        <Table.HeaderCell width={4}>카테고리</Table.HeaderCell>
                        <Table.HeaderCell width={6}>내역</Table.HeaderCell>
                        <Table.HeaderCell width={3}>가격</Table.HeaderCell>
                        <Table.HeaderCell>수단</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {tableBody(data)}
            </Table>
        </>
    )
}

export default ExpenseTable
import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'

import axios from 'axios';

function ExpenseAppend(props) {
    const [month, setMonth] = useState(undefined);
    const [date, setDate] = useState(undefined);
    const [instrument, setInstrument] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(undefined);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [instrumentOptions, setInstrumentOptions] = useState([]);

    useEffect(() => {
        let categoryOptions = []
        let categories = ([...new Set(props.data.map(data => data.category))])
        categories.forEach(category => {
            categoryOptions.push({
                key: category,
                text: category,
                value: category
            })
        });

        let instrumentOptions = []
        let instruments = ([...new Set(props.data.map(data => data.instrument))])
        instruments.forEach(instrument => {
            instrumentOptions.push({
                key: instrument,
                text: instrument,
                value: instrument
            })
        });

        setCategoryOptions(categoryOptions);
        setInstrumentOptions(instrumentOptions);
    }, [props])

    const handleChange = ( e, { name, value }) => {
        if (name === 'month') {
            setMonth(parseInt(value))
        }
        else if (name === 'date') {
            setDate(parseInt(value))
        }
        else if (name === 'instrument') {
            setInstrument(value)
        }
        else if (name === 'category') {
            setCategory(value)
        }
        else if (name === 'title') {
            setTitle(value)
        }
        else if (name === 'price') {
            setPrice(parseInt(value))
        }
    }

    const handleClick = () => {
        const data = {
            'month': month,
            'date': date,
            'instrument': instrument,
            'category': category,
            'title': title,
            'price': price
        }

        try {
            const response = axios.post("/expenses", data)
            .then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.log("error!!!!", error)
            }).then(function() {
                // ?????? ??????
                setMonth("");
                setDate("");
                setInstrumentOptions("");
                setCategory("");
                setTitle("");
                setPrice("");
                props.fetchExpense();
            });
            console.log(response)
        } catch {
            // ?????? ????????? ??????
            console.log("error")
        }

    }

    return (
        <div>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input type='number' name='month' value={ month } onChange={ handleChange } fluid label='???' placeholder='4' />
                    <Form.Input type='number' name='date' value={ date } onChange={ handleChange } fluid label='???' placeholder='24' />
                    <Form.Select
                        fluid
                        onChange={ handleChange } 
                        name='instrument'
                        label='??????'
                        options={instrumentOptions}
                        placeholder='hyundai'
                    />
                    <Form.Select
                        fluid
                        onChange={ handleChange } 
                        name='category'
                        label='????????????'
                        options={categoryOptions}
                        placeholder='?????????'
                    />
                    <Form.Input name='title' value={ title } onChange={ handleChange } fluid label='??????' placeholder='?????? ??????' />
                    <Form.Input name='price' value={ price } onChange={ handleChange } fluid label='??????' placeholder='55000' />
                    <Form.Button label='???' color='orange' onClick={ handleClick }>??????</Form.Button>
                </Form.Group>
            </Form>

        </div>
    )
}

export default ExpenseAppend
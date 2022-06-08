// import React from 'react'

function AddComma(num)
{
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

export default AddComma

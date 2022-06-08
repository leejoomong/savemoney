import React from 'react'
import { Label } from 'semantic-ui-react'


function CategoryLabel(category, color) {
    const categoryToColor = {
        'hyundai': 'green',
        'woori': 'blue',
        'shinhan': 'grey',
        'cash': 'yellow'
    }
    return (
        <Label color={categoryToColor[category]}>
            {category}
        </Label>
    )
  
}

export default CategoryLabel
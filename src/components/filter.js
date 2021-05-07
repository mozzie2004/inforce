import { Dropdown, DropdownButton } from 'react-bootstrap';

const Filter = ({sortBy, filter}) => {

    
    return (
        <div style={{display: 'flex', alignItems: 'center', width: '200px', justifyContent: 'space-around'}}>
            <DropdownButton   id="dropdown-basic-button" variant='secondary' title="Sort by">
                <Dropdown.Item onClick={()=>sortBy('Name')} href="#/action-1">Name</Dropdown.Item>
                <Dropdown.Item onClick={()=>sortBy('Count')} href="#/action-2">Count</Dropdown.Item>
            </DropdownButton>
            <div>{filter}</div>
        </div>
    )
}

export default Filter;
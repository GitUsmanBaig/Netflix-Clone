import React from 'react'
import { ManageSearch } from '@mui/icons-material'
import './GlobalFilter.scss'

const GlobalFilter = ({filter,setFilter}) => {
  return (
    <span>
        <ManageSearch className='serachlogo'/>: {' '}
        <input className='Input' value={filter || ''} onChange={(e) => setFilter(e.target.value)}/> 
    </span>
  )
}

export default GlobalFilter

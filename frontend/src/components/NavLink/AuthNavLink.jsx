import React from 'react'
import { Link } from 'react-router-dom';

function AuthNavLink(props) {
  return (
     <div className='mt-6'>
        <p className='font-light'>{props.title}<Link to={props.link} className='pt-9 text-blue-300'>{props.navTitle}</Link></p>
    </div>
  )
}

export default AuthNavLink
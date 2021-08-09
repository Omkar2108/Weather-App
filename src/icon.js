import React from 'react';
import AnimatedIcon from 'react-animated-weather';

export default function Icon(props)
{
    if(props.icon !== "" ){
        return(
            <div>
                <AnimatedIcon 
                icon={props.icon}
                size={50}
                />
            </div>
        )
    }else{
        return(
            <></>
        )
    }
}
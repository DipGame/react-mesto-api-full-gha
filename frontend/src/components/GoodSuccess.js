import InfoTooltip from './InfoTooltip.js';
import lableOk from '../images/Ok.png';
import React from 'react';

export default function GoodSuccess(props) {

    return (
        <InfoTooltip isOpen={props.isOpen} lable={lableOk} title={'Успешно!'} />
    )
}


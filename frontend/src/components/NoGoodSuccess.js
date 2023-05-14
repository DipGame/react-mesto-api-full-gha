import InfoTooltip from './InfoTooltip.js';
import lableNoOk from '../images/noOk.png';
import React from 'react';

export default function NoGoodSuccess(props) {

    return (
        <InfoTooltip isOpen={props.isOpen} lable={lableNoOk} title={'Что-то пошло не так! Попробуйте ещё раз.'} />
    )
}


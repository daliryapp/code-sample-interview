import React, {
    ReactNode,
} from 'react';
import useCustomeRadioStyle from './customeRadio.style';
import classnames from 'classnames';

interface ICustomeRadio {
    children?: ReactNode;
    onClick?: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}
const CustomeRadio = ({ children, onClick, isActive, isDisabled }: ICustomeRadio) => {
    const classes = useCustomeRadioStyle();
    return (<>
        <button
            type="button"
            disabled={isDisabled}
            className={classnames(classes.customeRadio, isActive ? classes.active : null, isDisabled ? classes.customeRadioDisable : null)}
            onClick={onClick}
        >
            {children}
        </button>
    </>);
}
export default CustomeRadio;
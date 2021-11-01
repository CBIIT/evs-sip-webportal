
import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './Button.module.css';

const ButtonStyled = (props) => {
  return <Button className={styles.button} onClick={props.onClick}>{props.children}</Button>;
}

export default ButtonStyled;




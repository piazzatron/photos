import React from 'react'
import { ButtonHTMLAttributes } from 'react'
import { DetailedHTMLProps } from 'react'
import styles from './Button.module.css'

const Button: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <div
      className={styles.container}
      style={{ opacity: props.disabled ? 0.5 : 1 }}
    >
      <button {...props}>{props.children}</button>
    </div>
  )
}
export default Button

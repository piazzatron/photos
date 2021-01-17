import React from 'react'
import { TextareaHTMLAttributes } from 'react'
import { InputHTMLAttributes } from 'react'
import { DetailedHTMLProps } from 'react'
import styles from './Input.module.css'

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <div className={styles.container}>
      <input {...props} />
    </div>
  )
}

export const TextArea: React.FC<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = (props) => {
  return (
    <div className={styles.container}>
      <textarea {...props} />
    </div>
  )
}

export default Input

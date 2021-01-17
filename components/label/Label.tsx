import { LabelHTMLAttributes } from 'react'
import { DetailedHTMLProps } from 'react'
import styles from './Label.module.css'

const Label: React.FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLElement>, HTMLLabelElement>
> = (props) => {
  return (
    <div className={styles.container}>
      <label {...props} />
    </div>
  )
}

export default Label

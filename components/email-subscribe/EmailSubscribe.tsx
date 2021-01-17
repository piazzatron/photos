import { useCallback, useState } from 'react'
import styles from './EmailSubscribe.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import Input from '../input/Input'
import Button from '../button/Button'
import Send from '../../public/send.svg'

const EMAIL_FORM_ENDPOINT = 'https://formspree.io/f/mvovloza'

const EmailSubscribe = () => {
  const [email, setEmail] = useState('')
  const [serverState, setServerState] = useState({
    sending: false,
    didSend: false,
    error: null,
  })
  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setServerState({ sending: true, didSend: false, error: null })
    try {
      const res = await fetch(EMAIL_FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (res.ok) {
        setServerState((s) => ({ ...s, didSend: true }))
      } else {
        console.log('error!')
      }
    } catch (e) {
      console.log('exception')
    } finally {
      setServerState((s) => ({ ...s, sending: false }))
    }
  }, [])
  return (
    <div className={cn(styles.container, utils.montserrat)}>
      <div className={cn(styles.title, utils.montserrat, utils.fontSemiBold)}>
        <Send />
        {serverState.didSend
          ? "You're subscribed!"
          : 'Subscribe to occasional updates?'}
      </div>
      <div className={cn(styles.subtitle, utils.montserrat)}>
        No spam ever, I promise.
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputGroup}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            name="email"
          />
          <Button
            className={styles.button}
            type="submit"
            disabled={
              !email?.length || serverState.sending || serverState.didSend
            }
          >
            {serverState.didSend
              ? 'Subscribed!'
              : serverState.sending
              ? 'Working...'
              : 'Subscribe'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EmailSubscribe

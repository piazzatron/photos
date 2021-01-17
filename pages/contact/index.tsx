import { useState } from 'react'
import StandardPageWrapper from '../../components/standard-page-wrapper/StandardPageWrapper'
import styles from './ContactPage.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import EmailSubscribe from '../../components/email-subscribe/EmailSubscribe'
import Button from '../../components/button/Button'
import Input, { TextArea } from '../../components/input/Input'

const ContactPage = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [serverState, setServerState] = useState({
    sending: false,
    didSend: false,
    error: null,
  })
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setServerState({ sending: true, error: null, didSend: false })
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/mvovveeq', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })
      if (res.ok) {
        console.log('submitted')
        setServerState((s) => ({ ...s, didSend: true }))
      } else {
        console.log('error!')
      }
    } catch (e) {
      console.log('exception')
    } finally {
      setServerState((s) => ({ ...s, sending: false }))
    }
  }

  return (
    <StandardPageWrapper title={'Contact'} headTitle={'Contact'}>
      <div className={styles.container}>
        <img className={styles.left} src={'/shy.jpg'} />
        <div className={styles.rightContainer}>
          <div className={styles.background} />
          <div className={cn(styles.title, utils.playfair, utils.fontBold)}>
            {`Don't be a stranger`}
            <div className={styles.emoji}>📬</div>
          </div>
          <div
            className={cn(styles.subtitle, utils.montserrat, utils.fontRegular)}
          >{`Leave a note and say hello`}</div>
          <form onSubmit={handleSubmit}>
            <TextArea
              className={styles.bodyInput}
              placeholder={'Your note'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              name="message"
            />
            <Input
              className={styles.emailInput}
              type="email"
              placeholder={'Your Email (optional)'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <Button
              type="submit"
              disabled={serverState.sending || serverState.didSend}
              className={styles.button}
            >
              {serverState.didSend ? 'Thanks for sending your note!' : 'Send'}
            </Button>
          </form>
        </div>
        <EmailSubscribe />
      </div>
    </StandardPageWrapper>
  )
}

export default ContactPage

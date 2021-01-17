import { useState } from 'react'
import StandardPageWrapper from '../../components/standard-page-wrapper/StandardPageWrapper'
import styles from './ContactPage.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import EmailSubscribe from '../../components/email-subscribe/EmailSubscribe'
import Button from '../../components/button/Button'
import Input, { TextArea } from '../../components/input/Input'
import Label from '../../components/label/Label'

const ContactPage = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
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
      <>
        <div className={styles.rightContainer}>
          <div className={cn(styles.title, utils.playfair, utils.fontBold)}>
            Say hello!
          </div>
          <div
            className={cn(styles.subtitle, utils.montserrat, utils.fontRegular)}
          >
            {"I'll try to get back as soon as I can"}
          </div>
        </div>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <Label>
              Your note
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                name="message"
              />
            </Label>
            <Label>
              Your email (optional)
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </Label>
            <Label>
              Your Name (optional)
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </Label>
            <Button
              type="submit"
              disabled={
                !message.length || serverState.sending || serverState.didSend
              }
              className={styles.button}
            >
              {serverState.didSend ? 'Thanks for sending your note!' : 'Send'}
            </Button>
          </form>
        </div>
        <div className={styles.divider} />
        <EmailSubscribe />
      </>
    </StandardPageWrapper>
  )
}

export default ContactPage

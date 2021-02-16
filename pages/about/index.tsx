import StandardPageWrapper from '../../components/standard-page-wrapper/StandardPageWrapper'
import styles from './About.module.css'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import { useEffect, useState } from 'react'
import { useSpring, animated, config, useTransition } from 'react-spring'

const BoldText: React.FC = ({ children }) => {
  return <div className={cn(utils.fontBold, styles.boldText)}>{children}</div>
}

const MY_FUNCTIONS = ['software engineer', 'photographer', 'human boy']

const FlippyText = () => {
  const [currentFunction, setCurrentFunction] = useState(0)
  // @ts-ignore
  const t = useTransition(currentFunction, (item) => item, {
    from: { y: -1, opacity: 1 },
    enter: { y: 0, opacity: 1 },
    // @ts-ignore
    leave: (item) => async (next) => {
      await next({ y: 1, opacity: 0, config: { clamp: true, duration: 0 } })
    },
    config: { ...config.wobbly, tension: 220 },
  })

  useEffect(() => {
    const handle = setTimeout(() => {
      setCurrentFunction((f) => (f + 1) % MY_FUNCTIONS.length)
    }, 2500)
    return () => {
      clearTimeout(handle)
    }
  }, [currentFunction])

  return (
    <>
      {t.map(({ item, key, props }) => (
        <animated.span
          key={key}
          style={{
            display: 'inline-block',
            opacity: props.opacity,
            // @ts-ignore
            transform: props.y.interpolate(
              (y: any) => `translateY(${y * -1 * 20}px)`,
            ),
          }}
        >
          {` ${MY_FUNCTIONS[item]}`}
        </animated.span>
      ))}
    </>
  )
}

const AGE = 28

const AboutPage = () => {
  const { age } = useSpring({
    age: AGE,
    from: { age: 0 },
    config: { ...config.molasses, friction: 100, clamp: true },
  })
  return (
    <StandardPageWrapper headTitle="About">
      <div className={cn(styles.mainView, utils.montserrat)}>
        <img src="/me.jpg" />
        <div className={styles.text}>
          <BoldText>{'> who are you'}</BoldText>
          <p>Hi!</p>
          <p>
            {`I’m Michael Piazza - a `}
            <FlippyText />
            <br />
            {` from Oakland California, living in San Francisco. `}
            <br />
            {`I'm `}
            <animated.span className={styles.animatedAge}>
              {age.interpolate((v) => Math.round(v as number))}
            </animated.span>
            {'.'}
          </p>
          <p>
            {`
            Photography has helped me maintain a playful relationship to reality and those who occupy it.
            It's half art practice, half meditation, and an excellent way to weather a pandemic.
          `}
          </p>
          <BoldText>{'> what is this place'}</BoldText>
          <p>
            {`This site is my little experiment at documenting (oversharing?) life as it transpires.
              I'm not really sure how it will evolve over the coming years, but I had a strong desire to carve out a cozy spot
              on the internet, apart from noisy social media platforms, for my photos to live in perpetuity. Let's see what happens.`}
            <p>{'Also, photos look so much better on a larger screen.'}</p>
          </p>
          <BoldText>{'> camera?'}</BoldText>
          <p>
            {`I mostly shoot X-Pro3 (always JPEG) and occasionally film on an ancient Canon AE-1.
            The Fuji X100F was my gateway drug into this whole mess. `}
          </p>
          <BoldText>{'> how did you make this'}</BoldText>
          <p>
            {
              'Not that it particularly matters, but I built this site from scratch with Next.js and Typescript.'
            }
            <a
              href="https://github.com/piazzatron/photos"
              target="_blank"
              rel="noreferrer"
            >
              Feel free to browse the code
            </a>
            {` if you're into that sort of thing, you weirdo :)`}
          </p>
        </div>
      </div>
      <div className={cn(styles.footnote, utils.montserrat)}>- Michael</div>
    </StandardPageWrapper>
  )
}

export default AboutPage

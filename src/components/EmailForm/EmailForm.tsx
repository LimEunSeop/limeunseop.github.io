import React, { useCallback, useRef, useState } from 'react'
import styles from './EmailForm.module.scss'

const EmailForm = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [status, setStatus] = useState<string>('')
  const textareaEl = useRef<HTMLTextAreaElement | null>(null)

  const adjustTextareaHeight = useCallback((textarea: HTMLTextAreaElement) => {
    textarea.style.height = ''
    textarea.style.height = textarea.scrollHeight + 'px'
  }, [])

  const onTextareaInput = useCallback(
    (e) => {
      const textarea = e.currentTarget
      adjustTextareaHeight(textarea)
    },
    [adjustTextareaHeight]
  )

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault()
      const form = e.currentTarget
      const data = new FormData(form)
      const xhr = new XMLHttpRequest()
      xhr.open(form.method, form.action)
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return
        if (xhr.status === 200) {
          form.reset()
          if (textareaEl.current !== null) {
            adjustTextareaHeight(textareaEl.current)
          }
          setStatus('SUCCESS')
        } else {
          setStatus('ERROR')
        }
      }
      xhr.send(data)
    },
    [adjustTextareaHeight]
  )

  return (
    <div {...props}>
      <form action="https://formspree.io/f/xpzoyayb" method="POST" className={styles.form} onSubmit={onSubmitForm}>
        <div className={styles.inputEl}>
          <label htmlFor="name" className="a11yHidden">
            Name
          </label>
          <input id="name" type="text" name="name" className={styles.inputEl} placeholder="Name" />
        </div>
        <div className={styles.inputEl}>
          <label htmlFor="email" className="a11yHidden">
            Email
          </label>
          <input id="email" type="text" name="email" className={styles.inputEl} placeholder="Email" required />
        </div>
        <div className={styles.inputEl}>
          <label htmlFor="message" className="a11yHidden">
            Message
          </label>
          <textarea id="message" name="message" className={styles.inputEl} placeholder="Message" rows={1} onInput={onTextareaInput} ref={textareaEl} required />
        </div>
        {status === 'SUCCESS' ? <p className={styles.status}>감사합니다!</p> : <button className={styles.submitButton}>전송</button>}
        {status === 'ERROR' && <p className={styles.status}>앗, 이런! 전송에 실패하였습니다.</p>}
      </form>
    </div>
  )
}

export default EmailForm

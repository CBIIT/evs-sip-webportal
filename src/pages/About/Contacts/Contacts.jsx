import styles from './Contacts.module.css'

const Contacts = () => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>EVS-SIP Contacts</div>
      <div className={styles.content}>
        <p>
          If you have any questions, please contact us at{' '}
          <a href="mailto:evssip@mail.nih.gov">evssip@mail.nih.gov</a>.
        </p>
      </div>
    </div>
  )
}

export default Contacts

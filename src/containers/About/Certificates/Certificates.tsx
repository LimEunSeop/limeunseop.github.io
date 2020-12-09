import React from 'react'
import { ListItem, Section } from 'App'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Certificates.module.scss'

// certificate images
import national from './images/national.png'
import ccna from './images/ccna.png'
import sap_abap from './images/sap_abap.png'
import sap_pp from './images/sap_pp.png'
import toeic from './images/toeic.png'
import jlpt from './images/jlpt.jpeg'
import history from './images/history.jpg'

interface Props {
  data: Section
}

interface CertItem {
  title: string
  img_url: string
}

const job_cert_images: Array<string> = [national, ccna, sap_abap, sap_pp]
const lang_cert_images: Array<string> = [toeic, toeic, jlpt]
const etc_cert_images: Array<string> = [history]

const Certificates = ({ data }: Props) => {
  console.log(data)
  const job_cert_section: Section = data.children[0]
  const lang_cert_section: Section = data.children[1]
  const etc_cert_section: Section = data.children[2]

  const job_certs: Array<CertItem> = []
  const lang_certs: Array<CertItem> = []
  const etc_certs: Array<CertItem> = []
  job_cert_section.contents.forEach((item, i) => {
    job_certs.push({ title: (item as ListItem).content, img_url: job_cert_images[i] })
  })
  lang_cert_section.contents.forEach((item, i) => {
    lang_certs.push({ title: (item as ListItem).content, img_url: lang_cert_images[i] })
  })
  etc_cert_section.contents.forEach((item, i) => {
    etc_certs.push({ title: (item as ListItem).content, img_url: etc_cert_images[i] })
  })

  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H className={styles.heading}>{data.title}</Heading.H>
        <Heading.LevelBoundary>
          {[
            ['직무', job_certs],
            ['어학', lang_certs],
            ['기타', etc_certs],
          ].map((section) => (
            <section>
              <Heading.H className={styles.subHeading}>{section[0]}</Heading.H>
              <ul className={styles.certList}>
                {(section[1] as Array<CertItem>).map((item) => (
                  <li>
                    <div className={styles.certImg} style={{ backgroundImage: `url(${item.img_url})` }}>
                      <p className={styles.certTitle}>{item.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Heading.LevelBoundary>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Certificates

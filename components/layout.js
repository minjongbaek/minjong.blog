import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/layout.module.css'

const name = '백민종'
export const siteTitle = '민종로그'

const Layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content="https://og-image.vercel.app/Minjong%20Log.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-color-logo.svg"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>

      <header className={styles.header}>
        <Image
          priority
          src="/images/profile.png"
          className={styles.profileImage}
          height={100}
          width={100}
          alt={name}
        />
        <div>
          <p className={styles.profileName}>
            {name}
          </p>
          <p className={styles.profileSumary}>
            2년차 주니어 개발자입니다.<br />
            프론트 엔드 기술에 관심이 많습니다.
          </p>
        </div>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>홈으로 돌아가기</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout
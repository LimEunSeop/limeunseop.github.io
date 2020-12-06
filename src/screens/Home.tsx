import React from 'react'
import { Section } from 'App'
import Cover from 'containers/Home/Cover'
import Reason from 'containers/Home/Reason'
import Want from 'containers/Home/Want'
import Hobby from 'containers/Home/Hobby'
import Wrapup from 'containers/Home/Wrapup'
import withLoader from 'hoc/WithLoader'

const theme_color: string = '#0EA55D'

interface Props {
  data: Section | null
}

const Home = ({ data }: Props) => {
  return (
    data && (
      <>
        {/* <Summary data={data.children[0]} /> */}
        <Cover coverColor={theme_color} />
        <Reason />
        <Want />
        <Hobby />
        <Wrapup />
      </>
    )
  )
}

Home.displayName = 'Home'

export default withLoader<Props>(theme_color, Home)

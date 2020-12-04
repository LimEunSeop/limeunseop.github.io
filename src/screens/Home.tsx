import React, { useContext, useEffect, useState } from 'react'
import { Section } from 'App'
import Cover from 'containers/Home/Cover'
import Reason from 'containers/Home/Reason'
import Want from 'containers/Home/Want'
import Hobby from 'containers/Home/Hobby'
import Wrapup from 'containers/Home/Wrapup'
import withLoader from 'components/Loader/WithLoader'

const theme_color: string = '#ff5751'

interface Props {
  data: Section
}

const Home = ({ data }: Props) => {
  return (
    <>
      {/* <Summary data={data.children[0]} /> */}
      <Cover />
      <Reason />
      <Want />
      <Hobby />
      <Wrapup />
    </>
  )
}

Home.displayName = 'Home'

export default withLoader<Props>(theme_color, Home)

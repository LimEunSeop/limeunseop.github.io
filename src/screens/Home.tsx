import React from 'react'
import { Section } from '../App'
import Summary from '../containers/Summary'

const Home = ({ data }: { data: Section }) => {
  return <Summary data={data.children[0]} />
}

export default Home

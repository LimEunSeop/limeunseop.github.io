import { computeHeadingLevel } from '@testing-library/react'
import React from 'react'
import { Section } from 'App'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import MarkdownView from 'react-showdown'

const Cover = ({ data }: { data: Section }) => {
  return (
    <div>
      <Heading.H>{data.title}</Heading.H>
      {/* Paragraph 타입의 컨텐츠만이 올수있음 */}
      {data.contents.map((content, i) => (
        <MarkdownView markdown={content as string} />
      ))}
    </div>
  )
}

export default Cover

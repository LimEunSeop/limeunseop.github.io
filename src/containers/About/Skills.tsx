import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Section, ListItem } from 'utils/makeResumeData'
import { Heading } from '@tenon-io/tenon-ui'
import cytoscape from 'cytoscape'

import cise from 'cytoscape-cise'
import styles from './Skills.module.scss'
import styled, { keyframes } from 'styled-components'
import { rem } from 'utils/styledComponentUtils'
import withContainerAnimate from 'hoc/withContainerAnimate'

cytoscape.use(cise) // cytoscape.js cise Layout 플러그인

interface Props {
  data: Section
}

interface Node {
  data: { id: string }
  grabbable: boolean
  pannable: boolean
  classes?: Array<string>
  style?: { 'background-color': string }
}

interface Edge {
  data: { id: string; source: string; target: string }
}

const colors: Array<string> = [
  '#97E15E',
  '#FF80E9',
  '#D69F29',
  '#3502A2',
  '#2273AE',
  '#EE0F7F',
  '#0261D5',
  '#8A490B',
  '#86A81B',
  '#0B36A3',
  '#A091D4',
  '#C100BE',
  '#454F9B',
  '#EF495C',
  '#6C1A9F',
  '#C1F574',
  '#5BA54A',
  '#6D76EA',
  '#501C3D',
  '#8F632F',
  '#DE9863',
]

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.i`
  display: inline-block;
  width: ${rem(100)};
  height: ${rem(100)};
  font-size: ${rem(100)};
  color: rgb(173, 181, 189);
  animation: ${spin} 1.5s infinite linear;
`

const Skills = forwardRef<HTMLElement, Props>(({ data }: Props, ref) => {
  const [isLoading, setIsLoading] = useState(true)
  const cy = useRef<cytoscape.Core | null>(null)

  const draw = useCallback(() => {
    let color_idx = -1
    const elements: Array<Node | Edge> = []
    elements.push({
      data: { id: 'Skills' },
      grabbable: false,
      pannable: true,
      classes: ['root'],
    })

    data.children.forEach((first) => {
      const firstNode: Node = {
        data: { id: first.title },
        grabbable: false,
        pannable: true,
        classes: ['first'],
      }
      elements.push(firstNode)

      const firstEdge: Edge = { data: { id: 'Skills->' + firstNode.data.id, source: 'Skills', target: firstNode.data.id } }
      elements.push(firstEdge)

      first.contents.forEach((second: ListItem | string) => {
        color_idx++
        const secondItem: ListItem = second as ListItem
        const secondNode: Node = {
          data: { id: secondItem.content },
          grabbable: false,
          pannable: true,
          classes: ['second'],
          style: {
            'background-color': colors[color_idx],
          },
        }
        elements.push(secondNode)

        const secondEdge: Edge = { data: { id: firstNode.data.id + '->' + secondNode.data.id, source: firstNode.data.id, target: secondNode.data.id } }
        elements.push(secondEdge)

        secondItem.children.forEach((third: string) => {
          const leaf_markdown_arr: RegExpMatchArray | null = third.split(',').map((item) => item.trim())
          if (leaf_markdown_arr !== null) {
            leaf_markdown_arr.forEach((leaf) => {
              const thirdNode: Node = {
                data: { id: leaf },
                grabbable: false,
                pannable: true,
                style: {
                  'background-color': colors[color_idx],
                },
              }

              elements.push(thirdNode)

              const thirdEdge: Edge = {} as Edge
              thirdEdge.data = { id: secondNode.data.id + '->' + thirdNode.data.id, source: secondNode.data.id, target: thirdNode.data.id }
              elements.push(thirdEdge)
            })
          }
        })
      })
    })
    cy.current = cytoscape({
      container: document.getElementById(styles.cy),

      elements: elements as cytoscape.ElementDefinition[],

      style: [
        // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'font-size': '18px',
            color: '#fff',
            label: 'data(id)',
          },
        },

        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
        {
          selector: '.root',
          style: {
            'background-color': 'red',
            width: '125px',
            height: '125px',
          },
        },
        {
          selector: '.first',
          style: { width: '75px', height: '75px', 'background-color': '#ddd' },
        },
        {
          selector: '.second',
          style: { width: '50px', height: '50px' },
        },
      ],
      layout: {
        name: 'cise',
      },
    })
  }, [data.children])

  useEffect(() => {
    setIsLoading(true)
    const timeoutID = window.setTimeout(() => {
      setIsLoading(false)
      draw()
    }, 1000)

    return () => {
      window.clearTimeout(timeoutID)
      cy.current?.destroy()
    }

    // cy.layout(options)
  }, [draw])
  return (
    <Heading.LevelBoundary>
      <section className={styles.container} ref={ref}>
        <Heading.H className={styles.heading}>{data.title}</Heading.H>
        <div id={styles.cy}>{isLoading && <Spinner className="fas fa-circle-notch" />}</div>
      </section>
    </Heading.LevelBoundary>
  )
})

Skills.displayName = 'Skills'

export default withContainerAnimate<Props>(Skills, styles.animate)

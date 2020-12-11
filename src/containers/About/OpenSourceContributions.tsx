import { forwardRef, useEffect } from 'react';
import { ListItem, Section } from 'App'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import Chart from 'chart.js'
import styles from './OpenSourceContributions.module.scss'
import withContainerAnimate from 'hoc/withContainerAnimate'

interface Props {
  data: Section
}

interface PullRequestItem {
  title: string
  count: number
}

const colors = [
  ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)'],
  ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)'],
  ['rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)'],
  ['rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)'],
  ['rgba(153, 102, 255, 0.2)', 'rgba(153, 102, 255, 1)'],
  ['rgba(255, 159, 64, 0.2)', 'rgba(255, 159, 64, 1)'],
]

const OpenSourceContributions = forwardRef<HTMLElement, Props>(({ data }: Props, ref) => {
  const pull_request_section: Section = data.children[0]

  useEffect(() => {
    const pull_requests: Array<PullRequestItem> = []
    pull_request_section.contents.forEach((item) => {
      const title = (item as ListItem).content
      const count = (item as ListItem).children.length
      pull_requests.push({ title, count })
    })

    const ctx = (document.getElementById('opensource__chart') as HTMLCanvasElement).getContext('2d')
    const myChart =
      ctx &&
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: pull_requests.map((item) => item.title),
          datasets: pull_requests.map((item, i) => ({
            label: item.title,
            data: [item.count],
            backgroundColor: [colors[i][0]],
            borderColor: [colors[i][1]],
            borderWidth: 1,
          })),
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      })
    return () => {
      myChart?.destroy()
    }
  }, [pull_request_section.contents])

  return (
    <Heading.LevelBoundary>
      <section className={styles.container} ref={ref}>
        <Heading.H className={styles.heading} aria-label="Open Source Contribution">
          Open Source
          <br />
          Contributions
        </Heading.H>
        <Heading.LevelBoundary>
          <section>
            <Heading.H className={`a11yHidden ${styles.subHeading}`}>Pull Requests</Heading.H>
            <div className={styles.chart}>
              <canvas id="opensource__chart"></canvas>
            </div>
          </section>
        </Heading.LevelBoundary>
      </section>
    </Heading.LevelBoundary>
  )
})

export default withContainerAnimate(OpenSourceContributions, styles.animate)

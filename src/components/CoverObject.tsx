import styled from 'styled-components'

const CoverObject = styled.div<{ themeName: string }>`
  background-color: ${({ theme, themeName }) => theme[themeName].mainColor};
`

export default CoverObject

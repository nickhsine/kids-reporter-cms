import React from 'react'
import styled from 'styled-components'
import { ContentBlock, ContentState } from 'draft-js'
import { getColorHex, ThemeColorEnum } from '../utils/index'

const LinkWrapper = styled.a<{ theme: { themeColor: ThemeColorEnum } }>`
  text-decoration: underline;
  color: ${({ theme }) => getColorHex(theme?.themeColor)};
  transition: color 0.1s ease-in;

  &:hover {
    color: #232323;
  }
`

function findLinkEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

export const linkDecorator = {
  strategy: findLinkEntities,
  component: Link,
}

function Link(props: {
  contentState: ContentState
  entityKey: string
  children: React.ReactNode
}) {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <LinkWrapper href={url} target="_blank">
      {props.children}
    </LinkWrapper>
  )
}

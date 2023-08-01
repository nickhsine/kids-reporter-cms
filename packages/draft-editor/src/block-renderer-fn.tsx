import { AtomicBlockProps } from './block-renderers/atomic-block'
import { ContentBlock } from 'draft-js'
import { EditableBlockquote } from './block-renderers/blockquote'
import { blockRenderers } from '@kids-reporter/draft-renderer'

const {
  EmbeddedCodeInArticleBody,
  ImageInArticleBody,
  InfoBoxBlock,
  SlideshowInArticleBody,
} = blockRenderers

const AtomicBlock = (props: AtomicBlockProps<Record<string, unknown>>) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0))

  const entityType = entity.getType()
  const entityData = entity.getData()

  switch (entityType) {
    case 'BLOCKQUOTE': {
      return EditableBlockquote(props)
    }
    case 'image': {
      return ImageInArticleBody({ data: entityData })
    }
    case 'slideshow': {
      return SlideshowInArticleBody({ data: entityData })
    }
    case 'EMBEDDEDCODE': {
      return EmbeddedCodeInArticleBody({ data: entityData })
    }
    case 'INFOBOX': {
      return InfoBoxBlock({ data: entityData })
    }
  }
  return null
}

export function atomicBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: AtomicBlock,
      editable: false,
      props: {},
    }
  }

  return null
}

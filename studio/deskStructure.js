import S from '@sanity/desk-tool/structure-builder'

import { MdHome, MdCategory, MdInfo } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['home', 'project', 'about'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(MdHome)
        .child(
          S.editor()
            .title('Home')
            .id('home')
            .schemaType('home')
            .documentId('home')
        ),
      S.listItem()
        .title('Projects')
        .icon(MdCategory)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('About')
        .icon(MdInfo)
        .child(
          S.editor()
            .title('About')
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])

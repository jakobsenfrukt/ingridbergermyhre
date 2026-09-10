import { CalendarIcon, CogIcon, DocumentIcon, HomeIcon } from '@sanity/icons'

const hiddenDocTypes = listItem =>
  !['home', 'project', 'about', 'settings'].includes(listItem.getId())

export default (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(HomeIcon)
        .child(
          S.editor()
            .title('Home')
            .id('home')
            .schemaType('home')
            .documentId('home')
        ),
      S.listItem()
        .title('Projects')
        .icon(CalendarIcon)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('About')
        .icon(DocumentIcon)
        .child(
          S.editor()
            .title('About')
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.editor()
            .title('Settings')
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])

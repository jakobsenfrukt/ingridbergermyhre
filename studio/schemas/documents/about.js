export default {
  title: 'About',
  name: 'about',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Intro',
      name: 'intro',
      type: 'text'
    }
  ]
}
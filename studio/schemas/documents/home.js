export default {
  title: 'Home',
  name: 'home',
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
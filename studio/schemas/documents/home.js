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
    },
    {
      title: 'Projects',
      description: 'Order of projects shown on the front page.',
      name: 'projects',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'project' }]
      }]
    },
    {
      title: 'Contact',
      name: 'contact',
      type: 'body'
    },
  ]
}
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
    },
    {
      title: 'Body',
      name: 'body',
      type: 'body'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility. Describe in short terms what is shown in the image as if to a blind person.',
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Credit'
        }
      ]
    },
    {
      title: 'Reviews & mentions',
      name: 'quotes',
      type: 'array',
      of: [
        {
          title: 'Quote',
          name: 'quote',
          type: 'object',
          fields: [
            {
              title: 'Quote text',
              name: 'text',
              type: 'text',
              rows: 3
            },
            {
              title: 'Name',
              name: 'name',
              type: 'string'
            },
            {
              title: 'Source',
              name: 'source',
              type: 'string'
            },
            {
              title: 'Source URL',
              name: 'sourceUrl',
              type: 'string'
            }
          ]
        },
      ]
    },
  ]
}
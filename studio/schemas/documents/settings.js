export default {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      title: 'Favicon',
      description: 'Upload an SVG file to use as the site favicon.',
      name: 'favicon',
      type: 'image',
      options: {
        accept: 'image/svg+xml'
      }
    },
    {
      title: 'Newsletter',
      name: 'newsletter',
      type: 'object',
      fields: [
        {
          title: 'Newsletter text',
          name: 'text',
          type: 'text',
          rows: 3
        },
        {
          title: 'URL',
          name: 'url',
          type: 'url'
        },
      ]
    },
    {
      title: 'Contact',
      name: 'contact',
      type: 'object',
      fields: [
        {
          title: 'Contact text',
          name: 'text',
          type: 'text',
          rows: 3
        },
        {
          title: 'Contact links',
          name: 'links',
          type: 'array',
          of: [
            {
              title: 'Email',
              name: 'emailLink',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                },
                {
                  title: 'Email',
                  name: 'email',
                  type: 'email'
                }
              ]
            },
            {
              title: 'Link',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                },
                {
                  title: 'Link text',
                  name: 'linkText',
                  type: 'string'
                },
                {
                  title: 'URL',
                  description: 'Paste the full URL to the venue or ticket website, including https:// etc.',
                  name: 'url',
                  type: 'string'
                }
              ]
            },
          ]
        },
      ]
    }
  ],
  preview: {
    prepare() {
      return { title: "Settings" };
    },
  },
}
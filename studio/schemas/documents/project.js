export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Click to generate a slug.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Premiere date',
      description: 'Used to sort projects in order of premiere date. Will not be shown on the public website.',
      name: 'premiereDate',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Dates',
      name: 'dates',
      type: 'array',
      of: [
        {
          type: 'projectDate'
        }
      ]
    },
    {
      title: 'Main image',
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
        }
      ]
    },
    {
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
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
      title: 'Credits',
      name: 'credits',
      type: 'body'
    },
    {
      title: 'Image gallery',
      name: 'imageGallery',
      type: 'imageGallery'
    },
    {
      title: 'Archive',
      description: 'When this is on (green), the project is not visible on the public website.',
      name: 'archive',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'title',
      archive: 'archive',
      image: 'image',
    },
    prepare(selection) {
      const { title, archive, image } = selection;

      return {
        title: title,
        subtitle: `${archive === true ? '(archive)' : ''}`,
        media: image,
      };
    },
  },
}
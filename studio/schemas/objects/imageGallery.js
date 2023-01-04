export default {
  title: 'Image gallery',
  name: 'imageGallery',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              title: 'Alternative text',
              description: 'Important for SEO and accessibility. Briefly describe what you see in the image as if to a blind person.',
              name: 'alt',
              type: 'string'
            },
            {
              name: 'credit',
              type: 'string',
              title: 'Credit'
            }
          ]
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
    },
    prepare(selection) {
      const { images, image } = selection;

      return {
        title: `Image gallery (${Object.keys(images).length} images)`,
        subtitle: `Alt text: ${image.alt}`,
        media: image,
      };
    },
  },
};
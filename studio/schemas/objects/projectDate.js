export default {
  title: 'Project date',
  name: 'projectDate',
  type: 'object',
  fields: [
    {
      title: 'Date',
      name: 'date',
      type: 'date'
    },
    {
      title: 'Show month only',
      name: 'monthOnly',
      type: 'boolean'
    },
    {
      title: 'Venue',
      name: 'venue',
      type: 'string'
    },
    {
      title: 'City',
      name: 'city',
      type: 'string'
    },
    {
      title: 'Venue/tickets URL',
      description: 'Paste the full URL to the venue or ticket website, including https:// etc.',
      name: 'url',
      type: 'string'
    },
    {
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Tryout', value: 'tryout'},
          {title: 'Premiere', value: 'premiere'},
          {title: 'Postponed', value: 'postponed'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'In residency', value: 'in-residency'},
        ],
        layout: 'radio'
      },
    }
  ],
  preview: {
    select: {
      venue: 'venue',
      city: 'city',
      date: 'date',
    },
    prepare(selection) {
      const { venue, city, date } = selection;

      return {
        title: `${venue ? venue + ', ' + city : city}`,
        subtitle: date,
      };
    },
  },
}

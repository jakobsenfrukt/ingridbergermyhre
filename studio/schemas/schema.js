// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import documents
import home from './documents/home'
import project from './documents/project'
import about from './documents/about'

// Import objects
import projectDate from './objects/projectDate'
import imageGallery from './objects/imageGallery'
import body from './objects/body'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    // documents
    home,
    project,
    about,
    // objects
    projectDate,
    imageGallery,
    body
  ]),
})

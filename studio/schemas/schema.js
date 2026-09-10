// Import documents
import home from './documents/home'
import project from './documents/project'
import about from './documents/about'
import settings from './documents/settings'

// Import objects
import projectDate from './objects/projectDate'
import imageGallery from './objects/imageGallery'
import body from './objects/body'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  // documents
  home,
  project,
  about,
  settings,
  // objects
  projectDate,
  imageGallery,
  body
]

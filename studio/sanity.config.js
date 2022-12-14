import { defineConfig } from "sanity"
import { deskTool } from 'sanity/desk'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'
import { colorInput } from "@sanity/color-input"

export default defineConfig({
  title: "Ingrid Berger Myhre",
  projectId: "vvl84ffe",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    colorInput()
  ],
  schema: {
    types: schemas,
  },
});
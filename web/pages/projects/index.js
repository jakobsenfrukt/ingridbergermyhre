import groq from 'groq'
import client from '../../client'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layout';
import ProjectList from '../../components/ProjectList';

const Projects = ({ data }) => {
  return (
    <Layout palette={data.home.projects[0].color.hex} home={data.home} projects={data.projects} settings={data.settings}>
      <Head>
        <title>Projects by {siteTitle}</title>
        <meta name="description" content={data.home.intro} />
      </Head>

      <ProjectList projects={data.projects} />
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(groq`{
    'home': *[_type == "home"][0] {
      ...,
      'projects': projects[]->
    },
    'projects': *[_type == "project" && archive != true] | order(premiereDate desc),
    'settings': *[_type == "settings"][0]{ favicon },
  }`)
  return {
    props: { data }
  }
}

export default Projects;

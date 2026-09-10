import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout';
import Upcoming from '../components/Upcoming';
import ProjectList from '../components/ProjectList';
import Intro from '../components/Intro';

const Home = ({ data }) => {
  return (
    <Layout palette={data.home.projects[0].color.hex} home={data.home} projects={data.projects} settings={data.settings}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={data.home.intro} />
      </Head>

      {data.home.intro && <Intro text={data.home.intro} />}
      <Upcoming projects={data.projects} limit="6" />
      <ProjectList projects={data.home.projects} />
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
    'settings': *[_type == "settings"][0],
  }`)
  return {
    props: { data }
  }
}

export default Home;

import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout';
import Upcoming from '../components/Upcoming';
import ProjectList from '../components/ProjectList';

const Home = ({ data }) => {
  return (
    <Layout palette={data.home.projects[0].color.hex} home={data.home} projects={data.projects}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={data.home.intro} />
      </Head>

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
  }`)
  return {
    props: { data }
  }
}

export default Home;

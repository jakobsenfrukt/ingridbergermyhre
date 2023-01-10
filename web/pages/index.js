import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout';
import Upcoming from '../components/Upcoming';
import ProjectList from '../components/ProjectList';

const Home = ({ data }) => {
  return (
    <Layout home={data.home}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Upcoming />
      <ProjectList projects={data.projects} />
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(groq`{
    'home': *[_type == "home"][0],
    'projects': *[_type == "project" && archive != true] | order(premiereDate desc),
  }`)
  return {
    props: { data }
  }
}

export default Home;

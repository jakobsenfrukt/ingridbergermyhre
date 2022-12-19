import groq from 'groq'
import client from '../client'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout';
import ProjectList from '../components/ProjectList';

const Home = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        {data.home.intro && <p className="lead">
          {data.home.intro}
        </p>}
      </section>
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

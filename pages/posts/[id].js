import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
    return (
      <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        {postData.date}
      </Layout>
    )
  }
export async function getStaticPaths() {
    // Return a list of possible value for id

    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    // Страница post теперь использует функцию getPostData в getStaticProps, чтобы получить данные post и вернуть их в качестве реквизита.

    const postData = getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }
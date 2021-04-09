import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
const utilStyles = require('../../styles/utils.module.css')
import { GetStaticProps, GetStaticPaths } from 'next'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}


// import Layout from '../../components/layout'
// import { getAllPostIds, getPostData } from '../../lib/posts'
// import Head from 'next/head'
// import Date from '../../components/date'
// import utilStyles from '../../styles/utils.module.css'


// export default function Post({ postData }) {
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       <article>
//         <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//         <div className={utilStyles.lightText}>
//           <Date dateString={postData.date} />
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//       </article>
//     </Layout>
//   )
// }

// export async function getStaticPaths() {
//     // Return a list of possible value for id

//     const paths = getAllPostIds()
//     return {
//       paths,
//       fallback: false
//     }
//   }

// export async function getStaticProps({ params }) {
//     // Fetch necessary data for the blog post using params.id
//     // Страница post теперь использует функцию getPostData в getStaticProps, чтобы получить данные post и вернуть их в качестве реквизита.

//     const postData = await getPostData(params.id)
//     return {
//       props: {
//         postData
//       }
//     }
//   }
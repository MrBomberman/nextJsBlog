import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}



// import fs from 'fs' // помогает читать контент нужного файла
// import path from 'path'
// import matter from 'gray-matter'; // превращает текст файла в формат объекта
// import remark from 'remark'
// import html from 'remark-html'


// const postsDirectory = path.join(process.cwd(), 'posts'); // process.cwd() - отдает нам директорию, в которой выполняется next js

// export async function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`) // Метод path.join() объединяет все данные сегменты пути вместе, используя для этого заданный платформенный разделитель, и приводит полученный путь к нормальному виду.
//   const fileContents = fs.readFileSync(fullPath, 'utf8') // читает весь контент файла

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)
//   // в такой формат превращает наши данные gray-matter
//     // {
//     //   content: '<h1>Hello world!</h1>',
//     //   data: { 
//     //     title: 'Hello', 
//     //     slug: 'home' 
//     //   }
//     // }

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark() // превращет определенный конент в нужный нам формат кода, например html
//     .use(html)
//     .process(matterResult.content)
//   const contentHtml = processedContent.toString()

//   // Combine the data with the id and contentHtml
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data
//   }
// }


// export function getSortedPostsData() {
//   // Get file names under /posts
//   const fileNames = fs.readdirSync(postsDirectory)
//   const allPostsData = fileNames.map(fileName => {
//     // Remove ".md" from file name to get id
//     const id = fileName.replace(/\.md$/, '')

//     // Read markdown file as string
//     const fullPath = path.join(postsDirectory, fileName)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data
//     }
//   })
//   // Sort posts by date
//   return allPostsData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1
//     } else {
//       return -1
//     }
//   })
// }

// export function getAllPostIds() {
//   const fileNames = fs.readdirSync(postsDirectory)

//   // Returns an array that looks like this:
//   // [
//   //   {
//   //     params: {
//   //       id: 'ssg-ssr'
//   //     }
//   //   },
//   //   {
//   //     params: {
//   //       id: 'pre-rendering'
//   //     }
//   //   }
//   // ]
//   return fileNames.map(fileName => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, '')
//       }
//     }
//   })
// }
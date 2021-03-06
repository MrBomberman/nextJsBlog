// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// req = HTTP incoming message, res = HTTP server response
// export default function handler(req, res) {
//   // ...
// }
// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' })
}

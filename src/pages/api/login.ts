import {NextApiRequest, NextApiResponse} from 'next'

import api from '../../service/api'

export default async (req: NextApiRequest, res:NextApiResponse) => {
  const method = req.method
  const data = req.body

  if (method !== 'POST'){
    res.statusCode = 200
    res.json({
      status: 500,
      message: 'Method is not allowed!'
    })
  }
  try { 
    const resHeroku = await api.callJson('/member/login.php', {data, method})
    const expireDay = new Date()
    expireDay.setDate(expireDay.getDate() + 1)
    res.statusCode = 200
    // res.setHeader('Set-Cookie', `token = ${resHeroku.token}; Expires = ${expireDay.toUTCString()}; Path=/`)
    res.json(resHeroku)
  } catch (e) {
    res.statusCode = 200
    res.json({
      status: 500,
      message: e.message
    })
  }

}

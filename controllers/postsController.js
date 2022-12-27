import db from '../db.js'

class PostsController {
  async createPost(req, res) {
    try {
      const { title, content, userId } = req.body
      const newPost = await db.query(
        `INSERT INTO post (title, content, user_id) values ($1, $2, $3) RETURNING * `,
        [title, content, userId]
      )
      res.json(newPost.rows[0])
    } catch (error) {
      console.log(error)
    }
  }
  async getPostByUser(req, res) {
    try {
      const id = req.query.id
      const posts = await db.query(`SELECT * FROM post WHERE user_id = $1`, [
        id,
      ])
      res.json(posts.rows)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new PostsController()

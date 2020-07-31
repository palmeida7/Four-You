const crud = (app, db)=>{


///CRUD operation
app.post("/new-blog", async (req, res) => {
    try {
      const description = req.body;
      console.log(description)
      const newBlog = await db.one(
        `INSERT INTO blogs (description) VALUES ($1) RETURNING *1`,
        [description]
        
      );
      res.json(newBlog)
      // res.render('blog', {blogs:blogs});
    } catch (error) {
      console.error(err.message);
    }
  });

app.get("/blog", async (req, res) => {
  try {
    const allblogs = await db.one('SELECT * FROM blogs');
    res.json(allblogs);
  } catch (error) {
    console.error(err.message);
  }
});

app.put("/blog/:id", async (req, res) => {
    try {
      let text_change = await db.one(`
      UPDATE blogs
      SET blog_text = '${req.body.blog_text}'
      WHERE id = '${req.params.id}' RETURNING *
    `);
    res.send(title_result);

    } catch (error) {
      console.error(err.message);
    }
});

app.delete("/blog/:id", async (req, res) => {
    try {
      let del_result = await db.none(`
      DELETE FROM blogs
      WHERE id = '${req.params.id}';
    `);
      res.redirect('/blog')
    } catch (error) {
      console.log(err.message);
    }
});
///End of 
}

module.exports = crud;
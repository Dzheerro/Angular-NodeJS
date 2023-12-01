const db = require('../util/database');

module.exports = class Post {
  constructor(title, company, body, user) {
    this.title = title;
    this.company = company;
    this.body = body;
    this.user = Number(user);

  }

  static fetchAll() {
    return db.execute('SELECT * FROM posts');
  }

  static save(post) {
    return db.execute(
      'INSERT INTO posts (title, company, body, user) VALUES (?, ?, ?, ?)', 
      [post.title, post.company, post.body, post.user]);
  }

  static delete(id) {
    return db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

};

 
const db = require('../util/database');

module.exports = class Post {
  constructor(title, company, city, body, user) {
    this.title = title;
    this.company = company;
    this.city = city;
    this.body = body;
    this.user = Number(user);

  }

  static fetchAll() {
    return db.execute('SELECT * FROM posts');
  }

  static save(post) {
    return db.execute(
      'INSERT INTO posts (title, company, city, body, user) VALUES (?, ?, ?, ?, ?)', 
      [post.title, post.company, post.city, post.body, post.user]);
  }

  static delete(id) {
    return db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }

  static filter(city) {
    return db.execute('SELECT * FROM posts WHERE city = ?', [city]);
  }
 
};

 
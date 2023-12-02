const { validationResult } = require('express-validator');

const Post = require('../models/post');
exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts)
  } catch (err) {
    console.error('Error in posting:', err);
    next(err); 
  }
}  

exports.postPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const title = req.body.title;
    const company = req.body.company;
    const city = req.body.city
    const body = req.body.body;
    const user = req.body.user;
  

    console.log('Received data:', { title, company, city, body, user });

    // Создаем нового пользователя
    const post = new Post(title, company, city, body, user);

    // Сохраняем пользователя в базу данных
    const result = await Post.save(post);

    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    console.error('Error in posting:', err);
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse)
  } catch (err) {
    console.error('Error in deleting post:', err);
    next(err); 
  }
}  

exports.filterPosts = async (req, res, next) => {
  try {
    const city = req.body.city; // Получаем город из тела запроса

    const [filteredPosts] = await Post.filter(city);
    res.status(200).json(filteredPosts);
  } catch (err) {
    console.error('Error in filtering posts:', err);
    next(err);
  }
}


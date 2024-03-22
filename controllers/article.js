const { Article, Category, User } = require("../models")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ArticleController {
    static healthCheck(req, res, next) {
        res.status(200).json({message: "Hello World"})
    }

    static index(req, res, next) {
        const { title } = req.query;

        // SELECT * FROM Articles WHERE  title ILIKE '%Artikel%'
        Article.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: [
                        'id',
                        'name',
                        'slug'
                    ]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'name',
                        'email'
                    ]
                }
            ]
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ArticleController;
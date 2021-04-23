let ipUrl = 'http://127.0.0.1:7001/front/'

let servicePath = {
    getArticles: ipUrl + 'article/list',             // 首页接口
    getArticleById: ipUrl + 'article/',                    // 文档详细页接口
    getTypes: ipUrl + 'type/list',                    // 获取类型接口
    getArticsByTypeId: ipUrl + 'articles/'            // 根据类型Id 获取文章
}

export default servicePath
import Mock from 'mockjs';

Mock.mock('/areaarticle', {
    "post":[
        {
            "articleId":19,
            "title":"wow",
            "areaId":"a",
            "creatorId":22000000,
            "creatorName":"小楠22",
            "tagOne":"dd",
            "tagTwo":"dd",
            "tagThree":"dd",
            "createTime":"2023-11-02 23:06:38",
            "summary":"ddddd"
        },
        {
            "articleId":18,
            "title":"wooo hooo",
            "areaId":"a",
            "creatorId":90000000,
            "creatorName":"张飞9",
            "tagOne":"3123",
            "tagTwo":"3212",
            "tagThree":"3213",
            "createTime":"2023-11-02 23:06:13",
            "summary":"dawdawdawd"
        }
    ]
    
});

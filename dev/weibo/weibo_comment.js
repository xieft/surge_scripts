const { $done } = require("../../runtime/surge/public");
const { read_text_file } = require("../../runtime/utils");

const main = async() => {
    let $response = {
        body: read_text_file('../../requests_and_responses/responses/private/weibo_comment.json')
    };

    // START
    let body = $response.body;
    body = JSON.parse(body);

    // 过滤评论（评论中嵌套的回复详情界面也会用这个 api，但那里没有 datas）
    // adType: '推荐/广告', type: 1
    if (body.hasOwnProperty('datas'))
        body['datas'] = body['datas'].filter(element => !(element['type'] === 1));

    body = JSON.stringify(body);
    $done({body});
    // END
};

main().then();

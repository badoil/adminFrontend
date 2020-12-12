let express = require('express');
let router = express.Router();
const util = require('../components/util')

/* 회원관리 기본 화면. */
router.get('/', function(req, res, next) {
    res.render('user/list', { page: '일반회원/회원 조회 및 수정' });
});

router.get('/setting/table',async function(req,res,next){
    //console.log('route-res:', res)
    const adminIdx = 1
    let tbl_idx
    const exposed_info = []
    let fixed_column_count = 0
    let exposed_count = 20

    const tableInfoUrl = `${process.env.api_url}/v2/tableName?tbl_name=일반회원`
    const tableInfo = await util.getAxios(tableInfoUrl)
    console.log("tableInfo:", tableInfo)
    if(tableInfo instanceof Error){
        next(tableInfo)
    }
    
    if(tableInfo.result && tableInfo.result.length!==0){
        
        tbl_idx = tableInfo.result[0].idx

        //테이블 th 정보
        const tableColumnUrl = `${process.env.api_url}/v2/tableColumn?tbl_idx=${tbl_idx}`
        const tableColumnResult = await util.getAxios(tableColumnUrl)
        //노출 정보
        const exposedUrl = `${process.env.api_url}/v2/tableColumnExposed?tbl_idx=${tbl_idx}&cust_idx=${adminIdx}`
        const exposedResult = await util.getAxios(exposedUrl)

        //노출정보 있을경우
        if(exposedResult.result && exposedResult.result.length!==0){
            const tempThInfo = []
            for(let i = 0 ; i<tableColumnResult.result.length ; i++){
                const tempObject = {
                    idx:tableColumnResult.result[i].idx,
                    tbl_idx:tableColumnResult.result[i].tbl_idx,
                    tbl_culum:tableColumnResult.result[i].tbl_culum,
                    tbl_param:tableColumnResult.result[i].tbl_param
                }
                tempThInfo.push(tempObject)
            }
            for(let i = 0 ; i<exposedResult.result.length ; i++){
                const result = tempThInfo.find(data=>data.idx==exposedResult.result[i].tbl_culum_idx)
                if(result && exposedResult.result[i].fix==="Y"){
                    fixed_column_count+=1
                    const tempObject = {
                        ...result,
                        fix:"Y"
                    }
                    exposed_info.push(tempObject)
                }else{
                    const tempObject = {
                        ...result,
                        fix:"N"
                    }
                    exposed_info.push(tempObject)
                }
            }
        }
        
        //테이블 노출 개수
        const exposedCountUrl = `${process.env.api_url}/v2/tableCustQryCount?tbl_idx=${tbl_idx}&cust_idx=${adminIdx}`
        const exposedCountResult = await util.getAxios(exposedCountUrl) 
        if(exposedCountResult.result && exposedCountResult.result.length!==0){
            exposed_count = exposedCountResult.result[0].count
        }
        console.log("tableColumnResult:", tableColumnResult)

        res.json({tableColumnResult, exposed_info,fixed_column_count,exposed_count})
    }else{
        
    }
})

router.post('/list/json',async function(req, res, next) {
    console.log('req.body',req.body)
    let apiUrl = `${process.env.api_url}/v2/customer?`
    const returnObj = req.body.returnObj
    //현재페이지
    let page
    if(returnObj.start / returnObj.length === 0){
        page = 1
    }else{
        page = (returnObj.start+returnObj.length) / returnObj.length
    }
    apiUrl+=`page=${page}&`

    //페이지 당 띄워줄 데이터 개수
    const srch_cnt = returnObj.length
    apiUrl+=`srch_cnt=${srch_cnt}&`

    //컬럼 정보
    const columns = returnObj.columns
    //console.log('columns',columns)

    for(let i = 0 ; i<columns.length ; i++){
        if(columns[i].search.value !== ""){
            apiUrl+=`${columns[i].data}=${columns[i].search.value}&`
        }
    }
    console.log('url',apiUrl)
     
    const response = await util.getAxios(apiUrl);
    if(response instanceof Error){
        next(response)
    }
    //console.log('response',response.pagenation)
    const data = response.result
    //console.log('response:', response)
    // const data = response.result.map(elem=>{
        
    //     if(elem.repr_img!==null)
    //         elem.repr_img = `${config.aws.s3.frontPath}/${elem.repr_img}`
    //     if(elem.loc_img!==null)
    //         elem.loc_img = `${config.aws.s3.frontPath}/${elem.loc_img}`
    //     return elem
    // })s  zx

    console.log('data',response.pagenation.total);
    res.json({data, recordsTotal:response.pagenation.total, recordsFiltered:response.pagenation.total});
});

router.get('/systemSearch', function(req, res, next) {
    res.render('user/systemSearch', { page: '공통코드 관리/공통코드 조회' });
});

router.get('/systemRegister', function(req, res, next) {
    res.render('user/systemRegister', { page: '공통코드 관리/공통코드 등록' });
});

router.get('/usersList', function(req, res, next) {
    res.render('user/list2', { page: '일반회원/회원 조회 및 수정' });
});

router.get('/member', function(req, res, next) {
    res.render('user/list3', { page: '일반회원/회원 조회 및 수정' });
});

router.get('/seller', function(req, res, next) {
    res.render('user/seller', { page: '셀러회원/셀러회원 조회 및 수정' });
});

router.get('/noseller', function(req, res, next) {
    res.render('user/noseller', { page: '셀러회원/미승인 셀러회원' });
});

router.get('/message', function(req, res, next) {
    res.render('user/message', { page: '메시지 발송/메시지 사용 설정' });
});

router.get('/automail', function(req, res, next) {
    res.render('user/automail', { page: '메시지 발송/자동발송 메일 설정' });
});

router.get('/autotext', function(req, res, next) {
    res.render('user/autotext', { page: '메시지 발송/자동발송 문자 설정' });
});

router.get('/sendtime', function(req, res, next) {
    res.render('user/sendtime', { page: '메시지 발송/자동발송 시간 설정' });
});

router.get('/restock', function(req, res, next) {
    res.render('user/restock', { page: '메시지 발송/재입고SMS 발송관리' });
});

router.get('/sendlist', function(req, res, next) {
    res.render('user/sendlist', { page: '메시지 발송/발송 내역 조회' });
});

module.exports = router;

# 온라인 스토어 관리자 페이지 프론트엔드 pug 템플릿 작업

+ 스타트업 회사인 teameverywhere 의 외주를 받음
+ adminServerApi, storeServerApi와 동일한 프로젝트의 관리자 페이지 프론트엔드 구현

# pug, bootstrap, jquery, datatables, ajax

+ 템플릿 엔진은 pug를 사용
+ 스타일은 bootstrap으로 처리
+ 스크립트 부분은 jquery와 자바스크립트로 처리
+ 서버 api로부터 데이터를 받아와서 테이블을 생성해야 하는 부분은 datatables 이용
+ 서버와의 통신은 ajax 사용

# 프로젝트 구조

기타 세팅파일 및 config 파일들은 생략해서 올렸고, 작업했던 파일 위주로 올림

전체적인 레이아웃은 bootstrap의 card로 잡고 card 안은 table로 만듬

user/form

+ form 과 script 폴더로 나누어서 작업
+ form 에서는 pug, bootstrap을 사용하여 화면을 그림

user/scripts

+ jquery와 javascript를 이용해서 스크립트 구성
+ scripts/comm_code_register_script 관리자의 입력을 받아 ajax로 서버에 등록하는 스크립트(자바스크립트)
+ scripts/comm_code_search_script 관리자의 검색 조건에 따라 ajax로 서버 데이터 호출하는 스크립트(자바스크립트)
  이때 받은 데이터를 DOM으로 테이블을 동적 생성
  
routes/user.js

+ datatables에 서버사이드렌더링을 적용했기 때문에 서버쪽 라우팅을 해당 폴더의 user.js에서 담당
+ 또한 user/sidebar.pug 에 걸려있는 링크를 user.js에서 라우팅을 담당
  
# Overview

어드민 페이지의 전체적인 모습은 다음과 같음

bootstrap card 와 table로 구성한 모습
<img width="1426" alt="adminPage1" src="https://user-images.githubusercontent.com/60473220/101978950-5a26f780-3c9c-11eb-95d6-830c260703ec.png">

datatables
<img width="1176" alt="adminPage2" src="https://user-images.githubusercontent.com/60473220/101978953-5b582480-3c9c-11eb-96c1-fa16e2c443a5.png">

datatables의 회원코드를 누르면 모달창 팝업
<img width="1173" alt="adminPage3" src="https://user-images.githubusercontent.com/60473220/101978955-5e531500-3c9c-11eb-80f2-7f562bcddfb6.png">

코드를 조회한후 해당 코드를 첫번째 표에서 클릭하면, 상세정보가 두번째 테이블에 나옴 (scripts/comm_code_search_script 부분)
<img width="1431" alt="adminPage4" src="https://user-images.githubusercontent.com/60473220/101978956-60b56f00-3c9c-11eb-93fe-783e9deae8e3.png">

해당입력창에 입력해서 서버에 등록 (scripts/comm_code_register_script 부분)
<img width="1430" alt="adminPage5" src="https://user-images.githubusercontent.com/60473220/101978959-63b05f80-3c9c-11eb-94fc-e78229007de8.png">

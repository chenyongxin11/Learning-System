# Learning-System

### 客户端

###### 框架

react

###### 数据库

mongodb cloud

###### package

axios(v1.3.4), react(v18.2.0), react-dom(v18.2.0), react-router-dom(v6.9.0), react-scripts(v5.0.1), web-vitals(v2.1.4)

###### routes (Main)

* client
  * public
    * index.html
  * src
    * components
      * course-component
      * enroll-component
      * home-component
      * login-component
      * nav-component
      * postCourse-component
      * profile-component
      * register-component
    * service
      * auth.service.js
      * course.service.js
    * App.js
    * index.js
* server
  * config
    * passport.js
  * models
    * course-model.js
    * user-model.js
    * index.js
  * routes
    * auth.js
    * course-route.js
    * index.js
  * .env
  * index.js
  * validation.js

###### run way

1. 运行server私服，node.js
2. 运行前端程序，npm start

###### warning

1. 本项目所有网页均在local host上运行访问，client端口为3000，server端口为8080
2. 本项目当前可供使用功能为：
   1. 主页：
      1. login
      2. register
   2. 教师端：
      1. 添加课程（post）
      2. 查看自己开设的课程以及相关信息（course）
   3. 学生端：
      1. 查看已参与的课程（course）
      2. 选课（enroll）(可模糊查询)
3. 本项目教师端与学生端后续功能将持续更新


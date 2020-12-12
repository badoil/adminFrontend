const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const createError = require('http-errors')
const MySQLStore = require('express-mysql-session')(session)
require('./config')

const app = express()

//api env

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 라우터
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const goodsRouter = require('./routes/goods')
const sabangRouter = require('./routes/sabang')
const postRouter = require('./routes/post')
const pointRouter = require('./routes/point')
const orderRouter = require('./routes/order')

// 라우터 등록
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/goods', goodsRouter)
app.use('/sabang',sabangRouter)
app.use('/post',postRouter)
app.use('/point', pointRouter)
app.use('/order', orderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

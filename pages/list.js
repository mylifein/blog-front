import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import * as Icon from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'


const CommonList = (list) => {

  const [mylist, setMylist] = useState(list.data)
  useEffect(() => {
    setMylist(list.data)
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>{React.createElement(Icon && Icon['CalendarOutlined'], { spin: true })}{item.releaseTime}</span>
                  <span>{React.createElement(Icon && Icon['FolderOutlined'])} {item.typeName}</span>
                  <span>{React.createElement(Icon && Icon['FireOutlined'])}  {item.viewCount}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />

        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

CommonList.getInitialProps = async (ctx) => {
  let id = ctx.query.id
  const promise = new Promise((resolve, reject) => {
    axios(servicePath.getArticsByTypeId + id).then((res) => {
      console.log(res.data)
      resolve(res.data)
    })
  })
  return await promise
}

export default CommonList
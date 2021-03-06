import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import * as Icon from '@ant-design/icons'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/index.css'
import styles from '../styles/Home.module.css'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
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
                  <span>{ React.createElement(Icon && Icon['CalendarOutlined'],{spin: true})}{item.releaseTime}</span>
                  <span>{ React.createElement(Icon && Icon['FolderOutlined'])} {item.typeName}</span>
                  <span>{ React.createElement(Icon && Icon['FireOutlined'])}  {item.viewCount}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}>

                </div>
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
Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios(servicePath.getArticles).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home

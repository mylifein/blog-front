import React, { useState, useEffect } from 'react'
import * as Icon from '@ant-design/icons'
import { Row, Col, Menu } from 'antd'
import '../styles/header.module.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {

    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchDate = async () => {
            const results = await axios(servicePath.getTypes).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(results)
        }
        fetchDate()
    }, [navArray])


    //跳转到列表页
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }

    const iconCreate = (menu) => {
        return React.createElement(Icon && Icon[menu.icon])
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">个人博客</span>
                    <span className="header-txt">专注前端开发</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            {React.createElement(Icon && Icon['HomeOutlined'])}
                            首页
                        </Menu.Item>
                        {
                            navArray.map(
                                (item) => {
                                    return (
                                        <Menu.Item key={item.id}>
                                            {React.createElement(Icon && Icon[item.icon])}
                                            {item.typeName}
                                        </Menu.Item>
                                    )
                                }
                            )
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
import React from 'react'
import {Avatar,Divider} from 'antd'
import * as Icon from '@ant-design/icons'
import '../styles/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="/images/profile.jpg"  /></div>
            <div className="author-introduction">
                专注于WEB和移动前端开发。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={ React.createElement(Icon && Icon['GithubOutlined']) } className="account"  />
                <Avatar size={28} icon={ React.createElement(Icon && Icon['QqOutlined']) } className="account" />
                <Avatar size={28} icon={ React.createElement(Icon && Icon['WechatOutlined']) }  className="account"  />

            </div>
        </div>
    )

}

export default Author
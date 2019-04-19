import React from "react";
import './index.css';

import Table from 'antd/lib/table';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';



interface Props {
  data: any[];
  columns: any[];
}

const links = [
  {key:0, name: '分期借款', link:'https://apply-static-uat.crfchina.com/xfd_shop_mpa/static/index.html'},
  {key:1, name: '商城首页', link:'https://apply-static-uat.crfchina.com/xfd_shop_mpa/static/index.html'},
  {key:2, name: '认证中心', link:'https://apply-static-uat.crfchina.com/xfd_shop_mpa/static/index.html'},
  {key:3, name: '个人中心', link:'https://apply-static-uat.crfchina.com/xfd_shop_mpa/static/index.html'},
];

class ContentList extends React.Component<Props> {

  getLinks(token) {
    links.forEach((item) => {
      item.link = `${item.link}?access_token=${token}`;
    });
    return links;
  }

  renderList(item) {
    return <p className="content-link" key={item.key}>
      <a href={item.link}>{item.name}</a>
    </p>
  }

  render() {
    let {data, columns} = this.props;
    console.log(JSON.stringify(data),data, '-----====+++++ 更新');
    return (
      <section className="content-list">
        <Table
          columns={columns}
          expandedRowRender={record => <div style={{margin: 0}}>
            { this.getLinks(record.description).map(this.renderList.bind(this)) }
          </div>}
          dataSource={data}
        />
      </section>
    );
  }
}

export default ContentList;

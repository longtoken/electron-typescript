import React from "react";
import './index.css';

import Table from 'antd/lib/table';
import Popover from 'antd/lib/popover';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import Base64 from 'Base64'

interface Props {
  data: any[];
}

const content = (e) => {
  return (
    <div>
      <p className="wordBreak">{Base64.atob(e)}</p>
      <p className="wordBreak">{e}</p>
    </div>
  );
};
const columns = [
  {title: '用户', dataIndex: 'account', key: 'account'},
  {title: '环境', dataIndex: 'env', key: 'env'},
  {title: 'token', dataIndex: 'token', key: 'token', render: (e) => <Popover content={content(e)} title="Title" trigger="click" placement="bottom">
      <Button>查看token</Button>
    </Popover>},
  {
    title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>,
  },
];

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
    return <div className="content-link" key={item.key}>
      <a href="javascript:;">{item.link}</a>
    </div>
  }

  render() {
    let {data} = this.props;
    console.log(JSON.stringify(data),data, '-----====+++++');
    return (
      <section className="content-list">
        <Table
          columns={columns}
          expandedRowRender={record => <p style={{margin: 0}}>
            { this.getLinks(record.description).map(this.renderList.bind(this)) }
          </p>}
          dataSource={data}
        />
      </section>
    );
  }
}

export default ContentList;

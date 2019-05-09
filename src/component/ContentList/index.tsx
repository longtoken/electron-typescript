import React, {PureComponent} from "react";
import './index.css';

import Table from 'antd/lib/table';
// import Popover from 'antd/lib/popover';
// import Button from 'antd/lib/button';
// import message from 'antd/lib/message';

interface Props {
  data: any[];
  columns: any[];
}

class ContentList extends PureComponent<Props> {

  getLinks(token) {
    const links = [
      {key: 0, name: '百度', link: 'https://www.baidu.com/'},
    ];
    links.forEach((item) => {
      console.log(item.link);
      item.link = `${item.link}?id=${token.id}`;
    });
    return links;
  }

  renderList(item) {
    return <p className="content-link" key={item.key}>
      <a href={item.link} target="_blank">{item.name}</a>
    </p>
  }

  render() {
    let {data, columns} = this.props;
    console.log('---render content list');
    return (
      <section className="content-list">
        <Table
          columns={columns}
          expandedRowRender={record => <div style={{margin: 0}}>
            {this.getLinks(record.description).map(this.renderList.bind(this))}
          </div>}
          dataSource={data}
        />
      </section>
    );
  }
}

export default ContentList;

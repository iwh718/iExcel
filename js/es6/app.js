'use strict';

import Excel from './components/Excel';
import React from 'react';
import ReactDOM from 'react-dom';


 let headers = ['姓名', '年龄', '性别', '爱好','管理'];
 let data = [['冬', '19', '男', 'reading'],['姚', '19', '女', 'studying'],['陈', '20', '男', 'playing']];


ReactDOM.render(
  <div className="panel-body">
    <Excel headers={headers} initialData={data} />
  </div>,
  document.getElementById('app')
);
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CategoryForm from '../CategoryForm';
import TagForm from '../TagForm';
import FoodForm from '../FoodForm/FoodForm';

function AdminPage() {
  const sidebarList = [
    {
      link: '/admin/food',
      title: 'Foods',
    },
    {
      link: '/admin/tag',
      title: 'Tags',
    },
    {
      link: '/admin/category',
      title: 'Categories',
    },
  ];
  return (
    <Router>
      <ul id="nav">
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <div>
        <div className="sidenav">
          {sidebarList.map(item => (
            <Link key={item.title} to={item.link}>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="main">
          <Switch>
            <Route path={'/admin/food'} component={FoodForm} />
            <Route path={'/admin/category'} component={CategoryForm} />
            <Route path={'/admin/tag'} component={TagForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default AdminPage;

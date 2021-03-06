import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CategoryForm from '../CategoryForm';
import TagForm from '../TagForm';
import FoodForm from '../FoodForm/FoodForm';
import Modal from '../../components/Modal';

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
      <div>
        <div className="sidenav">
          <a href="/">Home</a>
          {sidebarList.map(item => (
            <Link key={item.title} to={item.link}>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
        <div className="main">
          <Switch>
            <Route
              path={'/admin/food'}
              component={() => <FoodForm title="Food Form" />}
            />
            <Route
              path={'/admin/category'}
              component={() => <CategoryForm title="Category Form" />}
            />
            <Route
              path={'/admin/tag'}
              component={() => <TagForm title="Tag Form" />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
export default AdminPage;

import React from 'react'
import { Route } from 'react-router'
import r from 'routes'
import { Application, ApplicationsList, Header } from './components'

const Home = () =>
  <>
    <Header />

    <div className="container">
      {/*<nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Library</a></li>
          <li className="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>*/}

      <Route exact path={r.tutors.index} component={ApplicationsList}/>

      <Route path={r.tutors.application} component={Application} />
    </div>
  </>

export default Home

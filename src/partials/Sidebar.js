import React, { useEffect, useState, } from 'react';
import { NavLink } from 'react-router-dom';
import {$}  from 'react-jquery-plugin';

const Sidebar = () => {


  return (

    <aside className="left-sidebar bg-sidebar">
      <div id="sidebar" className="sidebar sidebar-with-footer">

        <div className="app-brand">
          <a href="/index.html">
            <svg className="brand-icon" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" width="30"
              height="33" viewBox="0 0 30 33">
              <g fill="none" fill-rule="evenodd">
                <path className="logo-fill-blue" fill="#7DBCFF" d="M0 4v25l8 4V0zM22 4v25l8 4V0z" />
                <path className="logo-fill-white" fill="#FFF" d="M11 4v25l8 4V0z" />
              </g>
            </svg>
            <span className="brand-name">Dashboard</span>
          </a>
        </div>

        <div className='sidebar-scrollbar'>

          <ul className="nav sidebar-inner" id="sidebar-menu" >

            <li className="has-sub active">
              <NavLink exact={true} activeclassName='is-active' to='/' aria-controls="dashboard">
                <i className="mdi mdi-home"></i>
                <span className="nav-text">Home</span>
              </NavLink>
            </li>

            <li  className= "has-sub" >
              <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#organisation" aria-expanded="false" aria-controls="organisation">
                <i className="mdi mdi-file-tree"></i>
                <span className="nav-text">Organisation</span> <b className="caret"></b>
              </a>
              <ul  className="collapse"  id="organisation" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/organigramme'>
                        <span className="nav-text">-&nbsp;&nbsp;Organigramme général</span>
                      </NavLink>
                    </li>
                    <li >
                      <NavLink className="sidenav-item-link" to='/acteurs'>
                        <span className="nav-text">-&nbsp;&nbsp;Acteurs internes</span> 
                      </NavLink>
                    </li>                         
                  </div>
              </ul>
            </li>

            <li className="has-sub">
            <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#processus" aria-expanded="false" aria-controls="processus">
                <i className="mdi mdi-file-document-box"></i>
                <span className="nav-text">Processus</span> <b className="caret yo2"></b>
              </a>
              <ul  className="collapse"  id="processus" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/vue-ensemble'>
                        <span className="nav-text">-&nbsp;&nbsp;Vue d'ensemble</span>
                      </NavLink>
                    </li>
                    <li >
                      <NavLink className="sidenav-item-link" to='/processus'>
                        <span className="nav-text">-&nbsp;&nbsp;Index de processus</span> 
                      </NavLink>
                    </li>                         
                  </div>
              </ul>
            </li>

            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#procedure" aria-expanded="false" aria-controls="procedure">
                <i className="mdi mdi-settings"></i>
                <span className="nav-text">Procédure</span> <b className="caret yo3"></b>
              </a>
              <ul  className="collapse"  id="procedure" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/procedures'>
                        <span className="nav-text">-&nbsp;&nbsp;Index des procédures</span>
                      </NavLink>
                    </li>                        
                  </div>
              </ul>
            </li>

            <li className="has-sub">
              <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#documentsutiles" aria-expanded="false" aria-controls="documentsutiles">
                <i className="mdi mdi-clipboard-text"></i>
                <span className="nav-text">Documents utiles</span> <b className="caret yo4"></b>
              </a>
              <ul  className="collapse"  id="documentsutiles" data-parent="#sidebar-menu">
                  <div className="sub-menu">
                    <li >
                      <NavLink className="sidenav-item-link" to='/documents-utiles'>
                        <span className="nav-text">-&nbsp;&nbsp;Documents/Annexes</span>
                      </NavLink>
                    </li>                        
                  </div>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;
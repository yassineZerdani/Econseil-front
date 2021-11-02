import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneProcess } from '../../redux/procmets/action';
import { getProcedure } from '../../redux/procorgs/action';
import ReactPaginate from 'react-paginate';
import {useState} from 'react'


const ProcessusAchat = () => {

  /* Get Process */

  const Proc = useSelector(state => state.procmets.procmet);

  /*-------------*/

  /* States */

  const [docsNumber, setDocsNumber] = useState(0);
  const [procNumber, setProcNumber] = useState(0);
  const [childsNumber, setChildsNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  /*--------*/

  /* Pagers */

  const elementsPerPage = 7;

  const pagesVisitedChilds = childsNumber*elementsPerPage;
  const pagesVisitedDocs = docsNumber*elementsPerPage;
  const pagesVisitedProc = procNumber*elementsPerPage;

  const childsCount = Math.ceil(Proc.childs.length/elementsPerPage);
  const docsCount = Math.ceil(Proc.documents.length/elementsPerPage);
  const procCount = Math.ceil(Proc.procedures.length/elementsPerPage);

 
  /*-------*/

  const dispatch = useDispatch();


  // const displayChilds = Proc.childs.map( (process, key) => {

  //   return(
  //     <tr>
  //       <td>
  //         <img src="/images/busp.ico.gif" class="pd-b-7" />&nbsp;&nbsp;
  //         <NavLink onClick={() => { dispatch(getOneProcess(process.id)) }} to={'/ProcessusAchat/' + process.id}>{process.attributes.title}</NavLink>
  //       </td>
  //       <td></td>
  //     </tr>
  //   );
  // });

  const displayDocs = Proc.documents.map((document, key) => {

    return (
       <tr>
         <td>
           <a download><img src="/images/extr.ico.gif" class="pd-b-7"/>&nbsp;&nbsp;{document.attributes.title}</a>
         </td>
         <td></td>
         <td></td>
         <td></td>
       </tr>
     );
   } 
 );

 const displayProcedures = Proc.procedures.map((procedure, key) => {

  return (
     <tr>
       <td>
          <img src="/images/proc.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
          <NavLink onClick={() => { dispatch(getProcedure(procedure.id)) }} to={'/ProcessusOrganisationnel/' + procedure.id}>{procedure.attributes.title}</NavLink>
        </td>
       <td></td>
       <td></td>
       <td></td>
     </tr>
   );
 } 
);


  var activeNavItem = $('.navlinks-po');

  activeNavItem.click(function () {
    activeNavItem.removeClass('active');
    $(this).addClass('active');
  });
  const section1 = () => {
    $('#section1').show();
    $('#section2').hide();
    $('#section3').hide();
    $('#section4').hide();
    $('#section5').hide();
    $('#section6').hide();
    $('#section7').hide();
  }
  
  const section2 = () => {
    $('#section1').hide();
    $('#section2').show();
    $('#section3').hide();
    $('#section4').hide();
    $('#section5').hide();
    $('#section6').hide();
    $('#section7').hide();

  }
  const section3 = () => {
    $('#section1').hide();
    $('#section2').hide();
    $('#section3').show();
    $('#section4').hide();
    $('#section5').hide();
    $('#section6').hide();
    $('#section7').hide();



  }
  const section4 = () => {
    $('#section1').hide();
    $('#section2').hide();
    $('#section3').hide();
    $('#section4').show();
    $('#section5').hide();
    $('#section6').hide();
    $('#section7').hide();

  }
  const section5 = () => {
    $('#section1').hide();
    $('#section2').hide();
    $('#section3').hide();
    $('#section4').hide();
    $('#section5').show();
    $('#section6').hide();
    $('#section7').hide();

  }

  return (
    <div>
      <h5 className="po-h">{Proc.nom}</h5>
      <div>
        <ul className="nav-po">
          <li></li>
          <li onclick={section1} className="navlinks-po active">Diagramme</li>
          <li onClick={section2} className="navlinks-po">Définition</li>
          <li onClick={section3} className="navlinks-po">Activités</li>
          <li onClick={section4} className="navlinks-po">Procédures</li>
          <li onClick={section5} className="navlinks-po">Documents annexes</li>
        </ul>
      </div>
      <div id="section1">
        <br/>
        <div style={{marginLeft:'40%'}} className="col-12" role="group">
          <button type="button" className="btn btn-icon" onclick="ZoomIn(1)">
            <FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="ZoomOut(1)">
            <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="OriginalSize(1);">
            <FontAwesomeIcon icon={faExpand}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="SizeToWidth(1);">
            <FontAwesomeIcon icon={faArrowsAltV}></FontAwesomeIcon>
          </button>
          <button type="button" className="btn btn-icon" onclick="SizeToHeight(1);">
            <FontAwesomeIcon icon={faArrowsAltH}></FontAwesomeIcon>
          </button>
        </div>
        <br/>
        <img style={{height: '700px'}} className="po-pic" src={Proc.image}></img>
      </div>
      <div id="section2">
      <div className="po-table-wrapper">
        <table className="po-table" >
          <thead>
            <tr>
              <th>Code du processus</th>
              <th>Finalité</th>
              <th>Principales activités</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Proc.code}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <div id="section3">
        <br/>
        <div className="search-box">
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." />
        </div>
        <br/>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="fl-table" >
            <thead>
              <tr>
                <th>SOUS PROCESSUS</th>
                <th>FINALITÉ</th>
              </tr>
            </thead>
            <tbody>
                
                <tr>
                  <td></td>
                  <td></td>
                </tr>
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={1}
              
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
          </table>
        </div>
      </div>
      <div id="section4">
        <br/>
        <div className="search-box">
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." />
        </div>
        <br/>
      <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
        <table className="fl-table" >
          <thead>
            <tr>
              <th>PROCÉDURE</th>
              <th>RÉFÉRENCE</th>
              <th>ACTIVITÉ DE RATTACHEMENT</th>
              <th>DATE D'APPLICATION</th>
            </tr>
          </thead>
          <tbody>
            {displayProcedures}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={1}
              
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
        </table>
      </div>
      </div>
      <div id="section5">
        <br/>
        <div className="search-box">
          <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
          <input type="text" className="input-search" placeholder="Rechercher..." />
        </div>
        <br/>
        <div className="table-wrapper" style={{width: '95%', marginLeft: '2.5%'}}>
          <table className="fl-table" >
            <thead>
              <tr>
                <th>DOCUMENT</th>
                <th>RÉFÉRENCE</th>
                <th>TYPE</th>
                <th>DATE DE PUBLICATION</th>
              </tr>
            </thead>
            <tbody>
              {displayDocs}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={1}
              
              containerClassName={"page"}
              previousClassName={"page__btn"}
              nextClassName={"page__btn"}
              disabledClassName={"page__numbers"}
              activeClassName={"page__numbers active"}
            />
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default ProcessusAchat;



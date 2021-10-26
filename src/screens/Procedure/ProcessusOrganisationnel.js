import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from "jquery";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setTime } from '../../functions/setTime';
import { getOperation } from '../../redux/operations/action';
import { getOperationActors } from '../../redux/operations/action';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';


const ProcessusOrganisationnel = () => {

  const Proc = useSelector(state => state.procorgs.procorg);

  console.log(Proc);

  /* States */

  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  /*--------*/

  /* Get procedure */

  //const Proc = useSelector(state => state.procorgs.procorg);

  /*---------------*/


    const dispatch = useDispatch();

    /* Pager */

    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Proc.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*--------*/


    /* Show documents */


  const displayDocs = Proc.documents.map((document, key) => {

     return (
        <tr>
          <td>
            <a download><img src="/images/extr.ico.gif" class="pd-b-7"/>&nbsp;&nbsp;{document.nom}</a>
          </td>
          <td></td>
          <td></td>
        </tr>
      );
    } 
  );

  /*----------------*/

  /* Show operations */

  const displayOps = Proc.operations.map((operation, key) => {

     return (
       <tr>
         <td>
           <NavLink onClick={() => { dispatch(getOperation(operation.id)) }} to={'/operation/'+operation.id}>
             <img src="/images/op.gif" class="pd-b-7"/>&nbsp;&nbsp;
             {operation.attributes.title}
           </NavLink>
         </td>
         <td>
            <NavLink onClick={() => { dispatch(getOperationActors(operation.id)) }} to={'/operation-acteurs/'+operation.id}>
             Acteurs
            </NavLink>
         </td>
         <td>order.attributes.field_description_operation.value</td>
       </tr>
     );
   } );

  /*------------------*/



  var activeNavItem = $('.navlinks-po');

  activeNavItem.click(function () {

    activeNavItem.removeClass('active');

    $(this).addClass('active');

  });


  function showSection (n,e) {

    e.preventDefault();

    if(n === 2){
      $('.section1').hide();
      $('.section2').show();
      $('.section3').hide();
      $('.section4').hide();
      $('.section5').hide();
      $('.section6').hide();
      $('.section7').hide();
    }

    else if(n === 1){
      $('.section1').show();
      $('.section2').hide();
      $('.section3').hide();
      $('.section4').hide();
      $('.section5').hide();
      $('.section6').hide();
      $('.section7').hide();
    }

    else if(n === 3){
      $('.section1').hide();
      $('.section2').hide();
      $('.section3').show();
      $('.section4').hide();
      $('.section5').hide();
      $('.section6').hide();
      $('.section7').hide();
    }

    else if(n === 4){
      $('.section1').hide();
      $('.section2').hide();
      $('.section3').hide();
      $('.section4').show();
      $('.section5').hide();
      $('.section6').hide();
      $('.section7').hide();
    }

    else if(n === 5){
      $('.section1').hide();
      $('.section2').hide();
      $('.section3').hide();
      $('.section4').hide();
      $('.section5').show();
      $('.section6').hide();
      $('.section7').hide();
    }

    else if(n === 6){
      $('.section1').hide();
      $('.section2').hide();
      $('.section3').hide();
      $('.section4').hide();
      $('.section5').hide();
      $('.section6').show();
      $('.section7').hide();
    }

    else if(n === 7){
      $('.section1').hide();
      $('.section2').hide();
      $('.section3').hide();
      $('.section4').hide();
      $('.section5').hide();
      $('.section6').hide();
      $('.section7').show();
    }

  };


  return (
    <div>
      <h3 className="po-h">{Proc.nom}</h3>
      <div>
        <ul className="nav-po">
          <li onclick={(e) => showSection(1, e)} className="navlinks-po">Diagramme</li>
          <li onClick={(e) => showSection(2, e)} className="navlinks-po">Fiche procédure</li>
          <li onClick={(e) => showSection(3, e)} className="navlinks-po">Objet</li>
          <li onClick={(e) => showSection(4, e)} className="navlinks-po">Terminologie</li>
          <li onClick={(e) => showSection(5, e)} className="navlinks-po">Règles de gestion</li>
          <li onClick={(e) => showSection(6, e)} className="navlinks-po">Opérations</li>
          <li onClick={(e) => showSection(7, e)} className="navlinks-po">Documents associés</li>
        </ul>
      </div>
      <div className="section1">
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

    




      <div className="section2">
        
        <div className="po-table-wrapper">
          <table className="po-table" >
            <thead>
              <tr>
                <th>Code</th>
                <th>Processus de rattachement</th>
                <th>Date de publication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Proc.code}</td>
                <td><img src="/images/busp.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;<NavLink to={'/ProcessusAchat/'+Proc.processus.id}>{Proc.processus.nom}</NavLink></td>
                <td>{Proc.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="po-table-wrapper">
        <div>
          <h5 style={{padding: '1%', textAlign: 'center', backgroundColor: '#324960', color: 'white'}}>Domaine d'application</h5>
          <p style={{padding: '2%'}}>{Proc.da}</p>
        </div>
        </div>
      </div>
      <div className="po-table-wrapper section3">
        <div>
          <h5 style={{padding: '1%', textAlign: 'center', backgroundColor: '#324960', color: 'white'}}>Objet</h5>
          <p style={{padding: '2%'}}>{Proc.objet}</p>
        </div>
      </div>
      <div className="po-table-wrapper section4">
        <table className="po-table" >
          <thead>
            <tr>
              <th>Terminologie</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Proc.terminologie}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="po-table-wrapper section5">
        <div>
          <h5 style={{padding: '1%', textAlign: 'center', backgroundColor: '#324960', color: 'white'}}>Règles de gestion</h5>
          <p style={{padding: '2%'}}>{Proc.regles}</p>
        </div>
      </div>
      <div className="section6">
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
                <th>OPÉRATION</th>
                <th>ACTEURS</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
                {displayOps}
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
      <div className="section7" >
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
                <th>CATÉGORIE</th>
                <th>RÉFÉRENCE</th>
              </tr>
            </thead>
            <tbody>
              {displayDocs}
            </tbody>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount}
              onPageChange={changePage} 
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

export default ProcessusOrganisationnel;



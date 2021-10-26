import { useEffect, useState, } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getActors } from '../../features/acteurs/action';
import { sendActor } from '../../features/acteur/acteur';
import { getActor } from '../../features/acteurs/action';
import { getSubActors } from '../../features/acteurs/action';



const ActeursOperation = () => {

    const acteurs = useSelector(state => state.acteurs.acteurs);

    const dispatch = useDispatch();

    console.log(acteurs)


    var Acteurs = acteurs.reduce((unique, o) => {
      if(!unique.some(obj => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    },[]);


    console.log(Acteurs);
 
    /* Pager */

    
    const [pageNumber, setPageNumber] = useState(0);


    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Acteurs.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    const [searchTerm, setSearchTerm] = useState('');


    const display = Acteurs.slice(pagesVisited, pagesVisited+ordersPerPage).filter(acteur => {
        if (searchTerm == "") {
            return acteur;
        }
        else if (acteur.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acteur;
        }
    }).map((acteur, key) => {

        let Parent = '';

        if(acteur.childs[0] !== undefined){

            if( acteur.parent.attributes !== undefined ){

            Parent = acteur.parent.attributes.title

            return (
                <tr key={key} >
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.id)) }} className="text-dark" to={'/acteur/'+acteur.id}>{acteur.attributes.title}</NavLink>
                    </td>
                    <td>{acteur.attributes.field_type_acteur}</td>
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.parent.id)) }} className="text-dark" to={'/acteur/'+acteur.parent.id}>{Parent}</NavLink>
                    </td>
                    <td>
                        <NavLink onClick={() => { dispatch(getSubActors(acteur.childs)) }} className="text-dark" to={'/acteurs-rattache/'+acteur.id}>Rattachement</NavLink>
                    </td>
                </tr>
            );}

            return (
                <tr key={key} >
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.id)) }} className="text-dark" to={'/acteur/'+acteur.id}>{acteur.attributes.title}</NavLink>
                    </td>
                    <td>{acteur.attributes.field_type_acteur}</td>
                    <td>Pas d'acteur parent</td>
                    <td>
                        <NavLink onClick={() => { dispatch(getSubActors(acteur.childs)) }} className="text-dark" to={'/acteurs-rattache/'+acteur.id}>Rattachement</NavLink>
                    </td>
                </tr>
            );

        }

        else {

            if( acteur.parent.attributes !== undefined ){

            Parent = acteur.parent.attributes.title

            return (
                <tr key={key} >
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.id)) }} className="text-dark" to={'/acteur/'+acteur.id}>{acteur.attributes.title}</NavLink>
                    </td>
                    <td>{acteur.attributes.field_type_acteur}</td>
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.parent.id)) }} className="text-dark" to={'/acteur/'+acteur.parent.id}>{Parent}</NavLink>
                    </td>
                    <td>Pas de sous acteurs</td>
                </tr>
            );}

            return (
                <tr key={key} >
                    <td>
                        <img src="/images/orgu.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                        <NavLink onClick={() => { dispatch(getActor(acteur.id)) }} className="text-dark" to={'/acteur/'+acteur.id}>{acteur.attributes.title}</NavLink>
                    </td>
                    <td>{acteur.attributes.field_type_acteur}</td>
                    <td>Pas d'acteur parent</td>
                    <td>Pas de sous acteurs</td>
                </tr>
            );
            
        }


    } );

    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Acteurs internes</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
                        </div>
                        <div className="table-wrapper">
                            <table id="ActeurInterneTableId" className="fl-table" >
                                <thead>
                                    <tr>
                                        <th className="wd-15p">Acteur</th>
                                        <th className="wd-5p">Type</th>
                                        <th className="wd-15p">Rattachement</th>
                                        <th className="wd-20p">Acteurs rattachés </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display}
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
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActeursOperation;
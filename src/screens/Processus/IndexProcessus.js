import React, { useEffect, useState, } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch, connect } from 'react-redux';
import { getProcess } from '../../redux/procmets/action';
import { getOneProcess } from '../../redux/procmets/action';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';


const IndexProcessus = (props) => {

    /* Get Process */

    useEffect(() => {

        props.getProcess()

    },[]);

    const { procmets } = props

    var Procmets = procmets.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
      },[]);

    /*-------------*/

    /* States */

    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    /*--------*/

    /* Send one process */

    const dispatch = useDispatch();

    /*-------------------*/
 
    /* Pager */

    const ordersPerPage = 7;
    const pagesVisited = pageNumber*ordersPerPage;
    const pageCount = Math.ceil(Procmets.length/ordersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    /*-------*/

    /* Show Process */

    const displayProcess = Procmets.slice(pagesVisited, pagesVisited+ordersPerPage).filter(process => {
        if (searchTerm == "") {
            return process;
        }
        else if (process.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return process;
        }
    }).map((process, key) => {

        return (
            <tr key={key} >
                <td>
                    <NavLink to={'/ProcessusAchat/'+process.id} className="text-dark" to={'/'}>{process.code}</NavLink>
                    {process.attributes.field_code_proc_metier}
                </td>
                <td>
                    <img src="/images/busp.ico.gif"  class="pd-b-7"/>&nbsp;&nbsp;
                    <NavLink onClick={() => { dispatch(getOneProcess(process.id)) }} to={'/ProcessusAchat/'+process.id}>{process.attributes.title}</NavLink>
                </td>
                <td></td>
                <td></td>
            </tr>
        );
    } );

    /*------------*/


    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Index des processus</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => {setSearchTerm(event.target.value);}}/>
                        </div>
                        <div className="table-wrapper">
                            <table id="ActeurInterneTableId" className="da-table" >
                                <thead>
                                    <tr>
                                        <th className="wd-15p">code</th>
                                        <th className="wd-5p">processus</th>
                                        <th className="wd-15p">finalité</th>
                                        <th className="wd-20p">Activité </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayProcess}
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

const mapStateToProps = (state) => {
    return {
      procmets: state.procmets.procmets 
    }
}
export default connect(mapStateToProps, { getProcess })(IndexProcessus);

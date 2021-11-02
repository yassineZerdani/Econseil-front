import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../redux/documents/action';
import { setTime } from '../../functions/setTime';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';


const DocumentsAnnex = (props) => {

    /* Get documents */

    useEffect(() => {

        props.getData()
        const { documents } = props

    }, []);

    const { documents } = props

    /*---------------*/

    /* States */

    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    /*--------*/

    /* Pager */

    const documentsPerPage = 7;
    const pagesVisited = pageNumber * documentsPerPage;
    const pageCount = Math.ceil(documents.length / documentsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    /*-------*/


    /* Show documents */

    const displayDocuments = documents.slice(pagesVisited, pagesVisited + documentsPerPage).filter(document => {
        if (searchTerm == "") {
            return document;
        }
        else if (document[0].attributes.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return document;
        }
    }).map((document, key) => {

        return (
            <tr key={key} >
                <td>
                    <a href={document[1]} download="document.txt"><img src="/images/extr.ico.gif" class="pd-b-7" />&nbsp;&nbsp;{document[0].attributes.title}</a>
                </td>
                <td></td>
                <td></td>
                <td>{setTime(document[0].attributes.created)}</td>
            </tr>
        );
    });

    /*-----------------*/


    return (
        <div className="content-wrapper">
            <div className="content">
                <div className="az-content-body az-content-body-dashboard-six mg-b-40 pd-l-25 pd-t-10">
                    <div className="row wd-100p">
                        <div className="col-12">
                            <h5 >Documents/Annexes</h5>
                        </div>
                        <div className="search-box">
                            <button className="btn-search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                            <input type="text" className="input-search" placeholder="Rechercher..." onChange={event => { setSearchTerm(event.target.value) }} />
                        </div>
                        <div className="table-wrapper">
                            <table >
                                <thead>
                                    <tr>
                                        <th scope="col">Document</th>
                                        <th scope="col">Référence</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Date de publication</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td data-label="Document:"><a download="document.txt"><img src="/images/extr.ico.gif" class="pd-b-7" />&nbsp;&nbsp;doc1</a></td>
                                        <td data-label="Référence:"> reference chi le3ba</td>
                                        <td data-label="Type:">type chi le3ba</td>
                                        <td data-label="Date de publication:">7/8/2020</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Document:"><a download="document.txt"><img src="/images/extr.ico.gif" class="pd-b-7" />&nbsp;&nbsp;doc1</a></td>
                                        <td data-label="Référence"> reference chi le3ba</td>
                                        <td data-label="Type:">type chi le3ba</td>
                                        <td data-label="Date de publication:">7/8/2020</td>
                                    </tr>
                                    <tr>
                                        <td data-label="Document:"><a download="document.txt"><img src="/images/extr.ico.gif" class="pd-b-7" />&nbsp;&nbsp;doc1</a></td>
                                        <td data-label="Référence:"> reference chi le3ba</td>
                                        <td data-label="Type:">type chi le3ba</td>
                                        <td data-label="Date de publication:">7/8/2020</td>
                                    </tr>

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
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents.documents
    }
}
export default connect(mapStateToProps, { getData })(DocumentsAnnex);
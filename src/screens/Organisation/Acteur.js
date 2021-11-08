import { faArrowsAltH, faArrowsAltV, faExpand, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Acteur() {

  const [isActiveOne, setIsActiveOne] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);
  const [isActiveThree, setIsActiveThree] = useState(false);
  const [isActiveFour, setIsActiveFour] = useState(false);
  const [isActiveFive, setIsActiveFive] = useState(false);
  const [isActiveSix, setIsActiveSix] = useState(false);
  const [isActiveSeven, setIsActiveSeven] = useState(false);

  const isActivee = (n) => {

    if(n === 1){
      setIsActiveOne(true);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 2){
      setIsActiveOne(false);
      setIsActiveTwo(true);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 3){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(true);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSeven(false);
    };
    if(n === 4){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(true);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 5){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(true);
      setIsActiveSix(false);
      setIsActiveSeven(false);
    };
    if(n === 6){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(true);
      setIsActiveSeven(false);
    };
    if(n === 7){
      setIsActiveOne(false);
      setIsActiveTwo(false);
      setIsActiveThree(false);
      setIsActiveFour(false);
      setIsActiveFive(false);
      setIsActiveSix(false);
      setIsActiveSeven(true);
    };
  }



  /* Get Actor */

  const Acteur = useSelector(state => state.acteurs.acteur);

  /*-----------*/


  return (
    <div>

 
      <h5 className="po-h">Acteur.nom</h5>
      <div>
        <ul className="nav-po">
          <li onClick={() => isActivee(1)} className={`nlpo ${isActiveOne ? 'nlpo-active' : ''}`}>Définition</li>
          <li onClick={() => isActivee(2)}  className={`nlpo ${isActiveTwo ? 'nlpo-active' : ''}`}>Diagramme</li>
          <li onClick={() => isActivee(3)} className={`nlpo ${isActiveThree ? 'nlpo-active' : ''}`}>3</li>
          <li onClick={() => isActivee(4)}  className={`nlpo ${isActiveFour ? 'nlpo-active' : ''}`}>4</li>
          <li onClick={() => isActivee(5)} className={`nlpo ${isActiveFive ? 'nlpo-active' : ''}`}>5</li>
          <li onClick={() => isActivee(6)}  className={`nlpo ${isActiveSix ? 'nlpo-active' : ''}`}>6</li>
          <li onClick={() => isActivee(7)} className={`nlpo ${isActiveSeven ? 'nlpo-active' : ''}`}>7</li>
        </ul>
      </div>

      <div className={` ${isActiveTwo ? '' : 'po-table-wrapper-b'}`}>
      <div  className="veBtnContainer" role="group">
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
            <div>
            <img className="OGimg" src="assets/images/93bf9d395db42247_c_fa10fac95ff2442d.png" alt="../images/93bf9d395db42247_c_fa10fac95ff2442d.png" usemap="#FA10FAC95FF2442D" border="0" />
            </div>
      </div>

      <div  className={`po-table-wrapper ${isActiveOne ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <table className="po-table" >
          <thead>
            <tr>
              <th>Type</th>
              <th>Interne/Externe</th>
              <th>Adresse electronique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Acteur.type}</td>
              <td>{Acteur.profile}</td>
              <td>{Acteur.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`po-table-wrapper ${isActiveOne ? 'po-table-wrapper' : 'po-table-wrapper-b'}`} >
        <div>
          <h5 style={{padding: '1%', textAlign: 'center', backgroundColor: '#324960', color: 'white'}}>Description</h5>
          <p style={{padding: '2%'}}>{Acteur.description}</p>
        </div>
      </div>
    </div>
  )
}




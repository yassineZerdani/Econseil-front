import { useSelector } from 'react-redux';

export default function Acteur() {

  /* Get Actor */

  const Acteur = useSelector(state => state.acteurs.acteur);

  /*-----------*/


  return (
    <div>
      <h5 className="po-h">{Acteur.nom}</h5>
      <div>
        <ul className="nav-po">
          <li style={{marginLeft: '1%'}} className="navlinks-po active">Définition</li>
        </ul>
      </div>

      <div className="po-table-wrapper" >
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
      <div className="po-table-wrapper">
        <div>
          <h5 style={{padding: '1%', textAlign: 'center', backgroundColor: '#324960', color: 'white'}}>Description</h5>
          <p style={{padding: '2%'}}>{Acteur.description}</p>
        </div>
      </div>
    </div>
  )
}




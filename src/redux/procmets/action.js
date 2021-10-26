import axios from 'axios';

export const getProcess = () => async dispatch => {


    const ID = await localStorage.getItem('user');

    const response = await axios.get('http://econseil.dd:8083/jsonapi/node/processus_metier?include=field_img_proc_met,field_proc_met_proc_met_parent,field_proc_met_sous_proc_met,field_proc_metier_docs,field_proc_metier_proc_orgs');

    console.log(response)

    var Procsorg = [];

    response.data.data.map(order => {

        order['documents'] = [];
        order['procedures'] = [];
        order['childs'] = [];
        order['parent'] = {};
        order['image'] = {};

        var docIndex = order.relationships.field_proc_metier_docs.data.length;
        var proceduresIndex = order.relationships.field_proc_metier_proc_orgs.data.length
        var childsIndex = order.relationships.field_proc_met_sous_proc_met.data.length

        response.data.included.map(file => {

            if (order.relationships.field_organisation.data.id == ID) {

                for (let i = 0; i < docIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_docs.data[i].id) || file.id === undefined) {

                        order.documents.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                for (let i = 0; i < proceduresIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_proc_orgs.data[i].id) || file.id === undefined) {

                        order.procedures.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === order.relationships.field_proc_met_sous_proc_met.data[i].id) || file.id === undefined) {

                        order.childs.push(file);
                        Procsorg = [...Procsorg, order];

                    }
                }

                // if ((order.relationships.field_proc_met_proc_met_parent.data.id != null) && (file.id === order.relationships.field_proc_met_proc_met_parent.data.id || file.id === undefined)) {

                //     order.parent = file 
                //     Procsorg = [...Procsorg, order];

                // }

                if (file.id === order.relationships.field_img_proc_met.data.id || file.id === undefined) {

                    order.image = file
                    Procsorg = [...Procsorg, order];

                }
            }
        }
        )
        console.log(order)
    }
    );

    console.log(Procsorg)

    dispatch(
        {
            type: 'GET_PROCMET',
            payload: Procsorg
        }
    );

}

export const getOneProcess = (identifier) => async dispatch => {


    const response = await axios.get('http://econseil.dd:8083/jsonapi/node/processus_metier/'+identifier+'?include=field_img_proc_met,field_proc_met_proc_met_parent,field_proc_met_sous_proc_met,field_proc_metier_docs,field_proc_metier_proc_orgs');

    console.log(response)

    var order = response.data.data;
    var procmet = {};


    procmet['nom'] = "";
    procmet['code'] = order.attributes.field_code_proc_metier;
    procmet['documents'] = [];
    procmet['procedures'] = [];
    procmet['childs'] = [];
    procmet['parent'] = {};
    procmet['image'] = {};

    var docIndex = order.relationships.field_proc_metier_docs.data.length;
    var proceduresIndex = order.relationships.field_proc_metier_proc_orgs.data.length
    var childsIndex = order.relationships.field_proc_met_sous_proc_met.data.length

    response.data.included.map(file => {

            for (let i = 0; i < docIndex; i++) {

                if ((file.id === order.relationships.field_proc_metier_docs.data[i].id) || file.id === undefined) {

                    procmet.documents.push(file);

                    }
                }

                for (let i = 0; i < proceduresIndex; i++) {

                    if ((file.id === order.relationships.field_proc_metier_proc_orgs.data[i].id) || file.id === undefined) {

                        procmet.procedures.push(file);

                    }
                }

                for (let i = 0; i < childsIndex; i++) {

                    if ((file.id === order.relationships.field_proc_met_sous_proc_met.data[i].id) || file.id === undefined) {

                        procmet.childs.push(file);

                    }
                }

                // if ((order.relationships.field_proc_met_proc_met_parent.data.id != null) && (file.id === order.relationships.field_proc_met_proc_met_parent.data.id || file.id === undefined)) {

                //     order.parent = file 
                //     Procsorg = [...Procsorg, order];

                // }

                if (file.id === order.relationships.field_img_proc_met.data.id || file.id === undefined) {

                    procmet.image = 'http://econseil.dd:8083'+ file.attributes.uri.url;

                }
        }
        );


    // var Procmet = Procsorg.reduce((unique, o) => {
    //     if(!unique.some(obj => obj.id === o.id)) {
    //       unique.push(o);
    //     }
    //     return unique;
    //   },[]);

    //   console.log(Procmet)

    dispatch(
        {
            type: 'GET_ONE_PROCMET',
            payload: procmet
        }
    );

}
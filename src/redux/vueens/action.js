import axios from 'axios';

export const getVueEnsemble = () => async dispatch => {

    const ID = await localStorage.getItem('user');

    const response = await axios.get('http://econseil.dd:8083/jsonapi/node/vue_ensemble?include=field_img_vue_ens,field_vue_ens_proc_met');

    console.log(response);

    var vue_ensemble = [];

    response.data.data.map(order => {

        order['processus'] = [];
        order['image'] = {}

        var processusIndex = order.relationships.field_vue_ens_proc_met.data.length;

        response.data.included.map(file => {

            if (order.relationships.field_organisation.data.id == ID) {

                for (let i = 0; i < processusIndex; i++) {

                    if ((file.id === order.relationships.field_vue_ens_proc_met.data[i].id) || file.id === undefined) {


                        order.processus.push(file);
                        vue_ensemble = [...vue_ensemble, order];

                    }


                }


                if (file.id === order.relationships.field_img_vue_ens.data.id || file.id === undefined) {
                    order.image = 'http://econseil.dd:8083'+file.attributes.uri.url;
                    vue_ensemble = [...vue_ensemble, order];

                }
            }
        }
        )
    }
    );

    dispatch(
        {
            type: 'GET_VUE_ENSEMBLE',
            payload: vue_ensemble
        }
    );
}
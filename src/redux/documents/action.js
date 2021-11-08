import axios from 'axios';


export const getData = () => async dispatch => {
    
    const ID = await localStorage.getItem('user');
    // const token = await sessionStorage.getItem('accessToken');
    const response = await axios.get('http://econseil.dd:8083/jsonapi/node/document?include=field_document', {
        // headers: {
        //   // eslint-disable-next-line no-template-curly-in-string
        //   Authorization: `Bearer ${token}`,
        // }
      });

    var Docs = [];

    response.data.data.forEach( order => {
        console.log(order)
        response.data.included.forEach( file => {
            if( order.relationships.field_organisme.data.id == ID){
            if ( file.id === order.relationships.field_document.data.id ){
    
                axios.get('http://econseil.dd:8083/jsonapi/file/file/'+file.relationships.field_media_document.data.id)
                .then(re => { 
                    const newDoc = [order, 'http://econseil.dd:8083/'+re.data.data.attributes.uri.url];
                    Docs = [...Docs, newDoc];
                    console.log(Docs);
                    dispatch(
                        {
                            type: 'GET_DOCS',
                            payload: Docs
                        }
                    );
                }
                )
                ;
            }
        }
        }
        )
    }
    );
}
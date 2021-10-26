import axios from 'axios';

export const getData = () => async dispatch => {
    

    // const token = await sessionStorage.getItem('accessToken');
    const response = await axios.get('http://econseil.dd:8083/jsonapi/node/application', {
        // headers: {
        //   // eslint-disable-next-line no-template-curly-in-string
        //   Authorization: `Bearer ${token}`,
        // }
      })

    dispatch(
        {
            type: 'GET_APP',
            payload: response.data
        }
    )
}
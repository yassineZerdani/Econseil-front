import axios from 'axios';

async function getUserId(name){
    const response = await axios.get('http://econseil.dd:8083/jsonapi/user/user');
    const users = [];
    let id = '';
    response.data.data.map( res => {
      users.push({
        id: res.id,
        name: res.attributes.display_name
      })
    });
    users.map( res => {
      if( res.name === name){
        id = res.id
      }
    })
    return id;
};

export { getUserId };
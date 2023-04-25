 const SetImage = ({url}) =>{
    return (url.startsWith('http') ? url : (`http://127.0.0.1:8000/`+url))
}
export default SetImage
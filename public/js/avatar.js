let profile = "";
let cover = "";

function ReadFile(evt, id) {
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById(id).src = e.target.result;
    };
    FR.readAsDataURL(evt.target.files[0]);
    if (id == "poimg"){
        profile = evt.target.files[0];
    } else if (id == "coimg"){
        cover = evt.target.files[0];
    }
    return evt.target.files[0];
};
document.getElementById("avatar").addEventListener("change", (evt)=>ReadFile(evt,"poimg"), false);
document.getElementById("cover").addEventListener("change", (evt)=>ReadFile(evt,"coimg"), false);


const uploadToServer = (evt) =>{
    const formData = new FormData();
    formData.append('pro_upload', profile);
    formData.append('cover_upload', cover);
    formData.append('full_name',document.getElementById('fullname').value);
    formData.append('bio',document.getElementById('bio').value);
    console.log(formData);
    fetch('/update', {
        method:'POST',
        body:formData
    })
    .then(resp=>resp.json())
    .then(data=>{
        window.location = '/users/profile'
        console.log(data)})
    .catch(error=>console.log(error))
}
// document.getElementById("imgupload").addEventListener("input", ReadFile);
document.getElementById("submit").addEventListener("click", uploadToServer);

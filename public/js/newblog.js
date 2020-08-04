let blog = "";

function ReadFile(evt, id) {
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById(id).src = e.target.result;
    };
    FR.readAsDataURL(evt.target.files[0]);
    if (id == "blogimg"){
        blog = evt.target.files[0];
    }
    return evt.target.files[0];
};
document.getElementById("postImg").addEventListener("change", (evt)=>ReadFile(evt,"blogimg"), false);


const uploadToServer = (evt) =>{
    const formData = new FormData();
    formData.append('blog_upload', blog);
    formData.append('title',document.getElementById('imgTitle').value);
    // formData.append('date',document.getElementById('userdate').value);
    console.log(formData);
    fetch('/createpost', {
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

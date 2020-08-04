let blog = "";

function ReadFile(evt) {
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById("blog-image").innerHTML = `<img src='${e.target.result}' />`
    };
    FR.readAsDataURL(evt.target.files[0]);
    blog = evt.target.files[0];
};

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

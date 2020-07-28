let file = "";

function coReadFile(evt) {
    console.log(evt.target.files[0]);
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById("cimgupload").src = e.target.result;
    };
    FR.readAsDataURL(evt.target.files[0]);
    file = evt.target.files[0];
}
document.getElementById("cover").addEventListener("change", coReadFile, false);

export default coReadFile

export let cimguploadToServer = (evt) =>{
    //best to commit it as such
    const formData = new FormData();
    formData.append('cimgupload', file);

    //not nessessay if you are just uploading a single image
    formData.append('username','value_from_another_form_item' )//etc
    formData.append('Some_other_DB_filed','AnotherValue' )//etc

    console.log(formData);
    fetch('/image-uploaded', {
        method:'POST',
        body:formData
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(error))

}

document.getElementById("cimgupload").addEventListener("input", coReadFile);//Whenever you change the image
document.getElementById("submit").addEventListener("click", cimguploadToServer);//when you hit the submit button


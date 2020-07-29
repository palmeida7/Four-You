let file = "";

function avReadFile(evt) {
    console.log(evt.target.files[0]);
    let FR= new FileReader();
    FR.onload = function(e) {
        document.getElementById("imgupload").src = e.target.result;
    };
    FR.readAsDataURL(evt.target.files[0]);
    file = evt.target.files[0];
    }
document.getElementById("avatar").addEventListener("change", avReadFile, false);

export default avReadFile

export let imguploadToServer = (evt) =>{
    const formData = new FormData();
    formData.append('imgupload', file);

    formData.append('username','value_from_another_form_item' )
    formData.append('Some_other_DB_filed','AnotherValue' )

    console.log(formData);
    fetch('/image-uploaded', {
        method:'POST',
        body:formData
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(error))

}

document.getElementById("imgupload").addEventListener("input", avReadFile);
document.getElementById("submit").addEventListener("click", imguploadToServer);

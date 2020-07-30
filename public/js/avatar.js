let profile = "";
let cover = "";

function ReadFile(evt,imgType) {
    console.log(imgType)
    let FR= new FileReader();
    FR.onload = function(e) {
        // document.getElementById(imgType).src = e.target.result;
        if (imgType == "cover"){
            document.getElementById("coimg").src = e.target.result;
        } else if (imgType == "avatar"){
            document.getElementById("poimg").src = e.target.result;
        }
    };
    FR.readAsDataURL(evt.target.files[0]);
    if (imgType == "avatar"){
        profile = evt.target.files[0]; 
    }
    if (imgType == "cover"){
        cover = evt.target.files[0];
    }
}
document.getElementById("avatar").addEventListener("change", (evt)=>ReadFile(evt,"avatar"), false);
document.getElementById("cover").addEventListener("change", (evt)=>ReadFile(evt,"cover"), false);


export default ReadFile

export let imguploadToServer = (evt) =>{
    const formData = new FormData();
    formData.append('pro_upload', profile);
    formData.append('cover_upload',cover);
    // formData.append('full_name',document.getElementById('fullname').value);
    // formData.append('bio',document.getElementById('bio').value);
    console.log(formData);
    fetch('/image-uploaded', {
        method:'POST',
        body:formData
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(error))

}

// document.getElementById("imgupload").addEventListener("input", ReadFile);
document.getElementById("submit").addEventListener("click", imguploadToServer);

# quill 이미지 별도 저장법.

react에서 quill을 사용할때 이미지를 그냥 넣으면 base64코드로 저장되어


용량에 무리를 줍니다.


필요에 따라선, 이미지나 동영상등을 외부에 저장 후에 사용 한다면, 


용량이나 처리속도에서 굉장한 도움이 될 수 있습니다.


```
 setImageSave = (image, callback) => {
     
    let range = this.quillRef.getEditor().getSelection();
    let editorCurr = this.quillRef.getEditor();
    //let value = prompt('What is the image URL');
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/!*");
    input.click();
    input.onchange = function (e) {
      const fd = new FormData();
      const file = e.target.files[0];
      const toDay = new Date();

      fd.append("fileName", customDateTypeFile(toDay)+"_"+file.name);
      fd.append('multipartFile' , file);

      insertTempImageUrl(fd) //이미지를 api로 전송.
        .then(res=>{ // s3 저장 후 저장값 받아오기.
          editorCurr.insertEmbed(range.index, 'image', res.data, "user");
        })
    }
  };

render () {
  const modules = {
      imageResize: {
        displaySize: true
      },
      toolbar: {
//        container : imageYn ? toolbar1 : toolbar2, //개인적 사용코드...
        handlers: {
          'image': this.setImageSave //handler를 추가하여 image버튼을 누를 때 이 핸들러가 작동합니다.
        }
      }
    };

return(
 <ReactQuill value={postContents}
             className={'insertPostQuill'}
             modules={modules}
             formats={formats}
             placeholder={'내용을 입력하여주세요'}
             ref={(el) => this.quillRef = el} />
)

}

```
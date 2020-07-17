const textInput: Function = () => {
    const text = <string>$("#textText").val();
    
    if(text != ""){
        const url: string = `http://localhost:3000/getsummary`;
        
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({"content": text}),
            contentType: "application/json",
            dataType: 'json',
            success: (result,status,XHR)=> {
                $("#summaryText").val(result.data);
            },
            error: (jqXHR,textStatus,errorThrown) => {
                $("#summaryText").val("some error occured");
            }
        })
    }
    return false;
}

// textInput()
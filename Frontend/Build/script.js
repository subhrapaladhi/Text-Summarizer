"use strict";
const textInput = () => {
    const text = $("#textText").val();
    if (text != "") {
        const url = `http://localhost:3000/getsummary`;
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({ "content": text }),
            contentType: "application/json",
            dataType: 'json',
            success: (result, status, XHR) => {
                $("#summaryText").val(result.data);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                $("#summaryText").val("some error occured");
            }
        });
    }
    return false;
};
// textInput()

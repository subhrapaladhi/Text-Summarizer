"use strict";
console.log("welcome subhra");
const textInput = () => {
    const text = $("#textText").val();
    // const text = "Many of the notable early successes occurred in the field of machine translation, due especially to work at IBM Research, where successively more complicated statistical models were developed. These systems were able to take advantage of existing multilingual textual corpora that had been produced by the Parliament of Canada and the European Union as a result of laws calling for the translation of all governmental proceedings into all official languages of the corresponding systems of government. However, most other systems depended on corpora specifically developed for the tasks implemented by these systems, which was (and often continues to be) a major limitation in the success of these systems. As a result, a great deal of research has gone into methods of more effectively learning from limited amounts of data."
    if (text != "") {
        console.log(text);
        const url = `http://localhost:3000/getsummary`;
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({ "content": text }),
            contentType: "application/json",
            dataType: 'json',
            success: (result, status, XHR) => {
                console.log(result);
                $("#summaryText").val(result.data);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log("error res", jqXHR, textStatus, errorThrown);
            }
        });
    }
    return false;
};
// textInput()
